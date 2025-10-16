import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/core/services/alert.service';
import { ArlService } from 'src/app/core/services/arl.service';

@Component({
  selector: 'app-arl-affiliation',
  templateUrl: './arl-affiliation.component.html',
  styleUrls: ['./arl-affiliation.component.scss']
})
export class ArlAffiliationComponent implements OnInit {

  arlForm!: FormGroup;
  isLoading = false;
  cities: any[] = [];

  constructor(
    private alertService: AlertService,
    private arlService: ArlService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchCities();
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

  create() {
    this.isLoading = true;
    this.arlService.createArl(this.arlForm.value).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Información para la afiliación a la ARL enviada')
        this.arlForm.reset();
        this.isLoading = false;
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message)
        this.isLoading = false;
      }
    })
  }


}
