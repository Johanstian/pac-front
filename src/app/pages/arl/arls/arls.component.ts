import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArlService } from 'src/app/core/services/arl.service';
import { ContractService } from 'src/app/core/services/contract.service';

@Component({
  selector: 'app-arls',
  templateUrl: './arls.component.html',
  styleUrls: ['./arls.component.scss']
})
export class ArlsComponent implements OnInit {

  arls: any;
  page: number = 1;
  size: number = 10;
  selectedItem: number = 10;
  collectionSize: number = 0;
  loading: boolean = false;
  download: boolean = false;

  error: string | null = null;

  constructor(
    private arlService: ArlService,
    private contractService: ContractService,
    private httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.getAllArlsByPaging();
  }

  getAllArlsByPaging() {
    this.loading = true;
    this.arlService.getAllArls(this.page, this.size).subscribe({
      next: (data) => {
        this.arls = data.arls;
        this.collectionSize = data.totalDocuments || data.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('🔍 Frontend - Error:', error);
        this.loading = false;
      }
    })
  }

  nextPage() {
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

 

}
