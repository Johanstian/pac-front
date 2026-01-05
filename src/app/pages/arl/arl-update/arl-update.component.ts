import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/core/services/alert.service';
import { ArlService } from 'src/app/core/services/arl.service';

@Component({
  selector: 'app-arl-update',
  templateUrl: './arl-update.component.html',
  styleUrls: ['./arl-update.component.scss']
})
export class ArlUpdateComponent implements OnInit {

  arlForm!: FormGroup;
  isLoading = false;
  loadingArl = false;
  cities: any[] = [];
  arlId: string = '';

  constructor(
    private alertService: AlertService,
    private arlService: ArlService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchCities();
    this.route.params.subscribe(params => {
      this.arlId = params['id'];
      if (this.arlId) {
        this.loadArl();
      }
    });
  }

  initForm() {
    this.arlForm = this.formBuilder.group({
      arlName: ['', Validators.required],
      documentType: ['', Validators.required],
      cc: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: [''],
      firstSurname: ['', Validators.required],
      secondSurname: [''],
      birthday: ['', Validators.required],
      sex: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      cellphone: ['', Validators.required],
      eps: ['', Validators.required],
      afp: ['', Validators.required],
      city: ['', Validators.required],
    })
  }

  loadArl() {
    this.loadingArl = true;
    this.arlService.getArlById(this.arlId).subscribe({
      next: (response) => {
        if (response.success && response.arl) {
          const arl = response.arl;
          // Formatear la fecha para el input date (yyyy-MM-dd)
          const birthday = arl.birthday ? new Date(arl.birthday).toISOString().split('T')[0] : '';
          
          this.arlForm.patchValue({
            arlName: arl.arlName || '',
            documentType: arl.documentType || '',
            cc: arl.cc || '',
            firstName: arl.firstName || '',
            secondName: arl.secondName || '',
            firstSurname: arl.firstSurname || '',
            secondSurname: arl.secondSurname || '',
            birthday: birthday,
            sex: arl.sex || '',
            email: arl.email || '',
            address: arl.address || '',
            cellphone: arl.cellphone || '',
            eps: arl.eps || '',
            afp: arl.afp || '',
            city: arl.city || '',
          });
        }
        this.loadingArl = false;
      },
      error: (error) => {
        this.alertService.error('Error', error.error?.message || 'No se pudo cargar la información de la ARL');
        this.loadingArl = false;
        this.router.navigate(['/pages/arl/arl-list']);
      }
    });
  }

  fetchCities() {
    this.httpClient.get<any[]>('https://api-colombia.com/api/v1/Department/31/cities').subscribe({
      next: (cities) => {
        this.cities = cities.sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (error) => {
        this.alertService.error('Error', 'No se pudieron cargar las ciudades');
      }
    });
  }

  update() {
    if (this.arlForm.invalid) {
      this.alertService.error('Error', 'Por favor complete todos los campos requeridos');
      return;
    }

    this.isLoading = true;
    this.arlService.updateArl(this.arlId, this.arlForm.value).subscribe({
      next: (response) => {
        this.alertService.success('¡Correcto!', response.message || 'Afiliación actualizada correctamente');
        this.isLoading = false;
        this.router.navigate(['/pages/arl/arl-list']);
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error?.message || 'Error al actualizar la afiliación');
        this.isLoading = false;
      }
    })
  }

  goBack() {
    this.router.navigate(['/pages/arl/arl-list']);
  }

}

