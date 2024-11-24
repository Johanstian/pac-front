import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { CdpService } from 'src/app/core/services/cdp.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cpd-create',
  templateUrl: './cpd-create.component.html',
  styleUrls: ['./cpd-create.component.scss']
})
export class CpdCreateComponent implements OnInit {

  rubros = [
    { code: '2.3.2.02.02.008.4301001.83990.31.3101.206', name: 'Realizar La Gestion Tecnica Y Administrativa Para El Fomento Del Deporte Formativo, Social Comunitario, Recreacion Y Actividad Fisica En El Valle Del Cauca.', res: '3167' },
    { code: '2.3.2.02.02.008.4301001.83990.31.3101.228', name: 'Realizar La Gestion Tecnica Y Administrativa Para El Fomento Del Deporte Formativo, Social Comunitario, Recreacion Y Actividad Fisica En El Valle Del Cauca.', res: '3168' },
    { code: '2.3.2.02.02.008.4301001.83990.31.3101.244', name: 'Realizar La Gestion Tecnica Y Administrativa Para El Fomento Del Deporte Formativo, Social Comunitario, Recreacion Y Actividad Fisica En El Valle Del Cauca.', res: '3166' },
    { code: '2.3.2.02.02.008.4301004.83990.61.6105.250', name: 'Realizar Conceptualizacion De Factibilidad Tecnica De Iniciativas Municipales Y Territoriales Para El Mejoramiento De La Infraestructura Deportiva En El Valle Del Cauca', res: '6131' },
  ];
  nombresRubros: any = [];

  dataForm!: FormGroup;
  eventForm!: FormGroup;
  homeForm!: FormGroup;
  techForm!: FormGroup;
  rpForm!: FormGroup;
  selectedFile: File | null = null;
  remainingCharacters: any;
  pdfUrl: string = '';


 

  cdpForm!: FormGroup;

  constructor(
    private alertService: AlertService,
    private cdpService: CdpService,
    private location: Location,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
  ) {

  }

  ngOnInit(): void {
    this.initCdpForm();
  }

  initCdpForm() {
    this.cdpForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      documento: ['', Validators.required],
      autorizacion: ['', Validators.required],
      fecha: ['', Validators.required],
      objeto: ['', Validators.required],
      resumido: ['', Validators.required],
      largo: ['', Validators.required],
      nombrerubro: ['', Validators.required],
      valor: ['', Validators.required],
      valorletras: ['', Validators.required],
      codigo: ['', Validators.required],
      nombreproyecto: ['', Validators.required],
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  create() {
    if (this.dataForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('title', this.dataForm.get('title')!.value);
    formData.append('subtitle', this.dataForm.get('subtitle')!.value);
    formData.append('phone', this.dataForm.get('phone')!.value);
    formData.append('address', this.dataForm.get('address')!.value);
    formData.append('products', this.dataForm.get('products')!.value);
    formData.append('facebook', this.dataForm.get('facebook')!.value);
    formData.append('mail', this.dataForm.get('mail')!.value);

    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile, this.selectedFile.name);
    }

    this.generalService.createProduct(formData).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Producto de la App creado');
        this.dataForm.reset();
        this.selectedFile = null;
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        this.remainingCharacters = null;
      }
    })
  }

  cdp() {
    this.cdpService.createCdp(this.cdpForm.value).subscribe({
      next: (data) => {
        this.alertService.success('¡Correcto!', 'CDP creado');
        this.cdpForm.reset();
      }
    })
  }

  back() {
    this.location.back();
  }


}