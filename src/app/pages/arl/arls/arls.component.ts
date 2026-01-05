// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ArlService } from 'src/app/core/services/arl.service';
// import { ContractService } from 'src/app/core/services/contract.service';

// @Component({
//   selector: 'app-arls',
//   templateUrl: './arls.component.html',
//   styleUrls: ['./arls.component.scss']
// })
// export class ArlsComponent implements OnInit {

//   arls: any;
//   allArls: any[] = [];
//   filteredArls: any[] = [];
//   searchTerm: string = '';
//   page: number = 1;
//   size: number = 10;
//   selectedItem: number = 10;
//   collectionSize: number = 0;
//   loading: boolean = false;
//   download: boolean = false;

//   error: string | null = null;

//   constructor(
//     private arlService: ArlService,
//     private contractService: ContractService,
//     private httpClient: HttpClient
//   ) {

//   }

//   ngOnInit(): void {
//     this.getAllArlsByPaging();
//   }

//   getAllArlsByPaging() {
//     this.loading = true;
//     this.arlService.getAllArls(this.page, this.size).subscribe({
//       next: (data) => {
//         this.allArls = data.arls || [];
//         this.collectionSize = data.totalDocuments || data.totalPages;
//         this.applyFilter();
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('🔍 Frontend - Error:', error);
//         this.loading = false;
//       }
//     })
//   }

//   applyFilter() {
//     if (!this.searchTerm || this.searchTerm.trim() === '') {
//       this.filteredArls = this.allArls;
//       this.arls = this.filteredArls;
//       return;
//     }

//     const search = this.searchTerm.toLowerCase().trim();
//     this.filteredArls = this.allArls.filter(arl => {
//       const cc = arl.cc ? arl.cc.toString().toLowerCase() : '';
//       const firstName = arl.firstName ? arl.firstName.toLowerCase() : '';
//       const secondName = arl.secondName ? arl.secondName.toLowerCase() : '';
//       const firstSurname = arl.firstSurname ? arl.firstSurname.toLowerCase() : '';
//       const secondSurname = arl.secondSurname ? arl.secondSurname.toLowerCase() : '';

//       return cc.includes(search) ||
//              firstName.includes(search) ||
//              secondName.includes(search) ||
//              firstSurname.includes(search) ||
//              secondSurname.includes(search);
//     });

//     this.arls = this.filteredArls;
//   }

//   onSearchChange() {
//     this.applyFilter();
//   }

//   nextPage() {
//     this.getAllArlsByPaging();
    
//   }

//   excel() {
//     this.download = true;
//     this.arlService.getExcel().subscribe({
//       next: (excelBlob: Blob) => {
//         const blob = new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'arls.xlsx';
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         this.download = false;
//       },
//       error: (error) => {
//         console.error('Error al descargar Excel:', error);
//         this.download = false;
//       }
//     });
//   }

 

// }



import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ArlService } from 'src/app/core/services/arl.service';
import { ContractService } from 'src/app/core/services/contract.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog.component';

@Component({
  selector: 'app-arls',
  templateUrl: './arls.component.html',
  styleUrls: ['./arls.component.scss']
})
export class ArlsComponent implements OnInit, OnDestroy {

  arls: any;
  searchTerm: string = '';
  page: number = 1;
  size: number = 10;
  selectedItem: number = 10;
  collectionSize: number = 0;
  loading: boolean = false;
  download: boolean = false;
  searchTimeout: any = null;

  error: string | null = null;

  constructor(
    private arlService: ArlService,
    private contractService: ContractService,
    private httpClient: HttpClient,
    private router: Router,
    private alertService: AlertService,
    private dialogService: NbDialogService
  ) {

  }

  ngOnInit(): void {
    this.getAllArlsByPaging();
  }

  getAllArlsByPaging() {
    this.loading = true;
    this.error = null;
    
    // Enviar el término de búsqueda al backend si existe
    const searchParam = this.searchTerm.trim() !== '' ? this.searchTerm.trim() : undefined;
    
    this.arlService.getAllArls(this.page, this.size, searchParam).subscribe({
      next: (data) => {
        this.arls = data.arls || [];
        this.collectionSize = data.totalDocuments || 0;
        this.loading = false;
      },
      error: (error) => {
        console.error('🔍 Frontend - Error:', error);
        
        // Si es un error 400 relacionado con "no se encontraron afiliaciones", tratarlo como sin resultados
        const errorMessage = error.error?.message || '';
        if (error.status === 400 && errorMessage.includes('No se encontraron afiliaciones')) {
          // Limpiar la lista y mostrar mensaje de "sin resultados"
          this.arls = [];
          this.collectionSize = 0;
          this.error = null; // No es un error, es simplemente "sin resultados"
        } else {
          // Para otros errores, mostrar el mensaje de error
          this.error = errorMessage || 'Error al cargar las afiliaciones';
        }
        
        this.loading = false;
      }
    })
  }

  onSearchChange() {
    // Cancelar búsqueda anterior si existe
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Resetear a página 1 cuando cambia la búsqueda
    this.page = 1;

    // Esperar 300ms antes de buscar
    this.searchTimeout = setTimeout(() => {
      this.getAllArlsByPaging();
    }, 400);
  }

  ngOnDestroy() {
    // Limpiar el timeout al destruir el componente
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  nextPage() {
    this.page++;
    this.getAllArlsByPaging();
  }

  excel() {
    this.download = true;
    this.arlService.getExcel().subscribe({
      next: (excelBlob: Blob) => {
        const blob = new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'arls.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        this.download = false; // ✅ Descarga completada
      },
      error: (error) => {
        console.error('Error al descargar Excel:', error);
        this.download = false;
      }
    });
  }

  editArl(id: string) {
    this.router.navigate(['/pages/arl/arl-update', id]);
  }

  deleteArl(id: string, firstName: string, firstSurname: string) {
    const nombre = `${firstName} ${firstSurname}`;
    const confirmMessage = `¿Está seguro de que desea eliminar la afiliación de ${nombre}? Esta acción no se puede deshacer.`;
    
    this.dialogService.open(DeleteConfirmDialogComponent, {
      context: {
        message: confirmMessage
      }
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.arlService.deleteArl(id).subscribe({
          next: (response) => {
            this.alertService.success('¡Correcto!', response.message || 'Afiliación eliminada correctamente');
            // Limpiar búsqueda y recargar la ruta
            this.searchTerm = '';
            this.page = 1;
            this.router.navigate(['/pages/arl/arl-list']).then(() => {
              this.getAllArlsByPaging();
            });
          },
          error: (error) => {
            this.alertService.error('¡Error!', error.error?.message || 'Error al eliminar la afiliación');
          }
        });
      }
    });
  }

}
