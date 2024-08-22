import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-undertake',
  templateUrl: './undertake.component.html',
  styleUrls: ['./undertake.component.scss']
})
export class UndertakeComponent implements OnInit {

  dataForm!: FormGroup;
  eventForm!: FormGroup;
  homeForm!: FormGroup;
  techForm!: FormGroup;
  selectedFile: File | null = null;
  remainingCharacters: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.initEventForm();
    this.initHomeForm();
    this.initEventTechForm();
  }

  initForm() {
    this.dataForm = this.formBuilder.group({
      title: [null, Validators.required],
      subtitle: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      products: [null, Validators.required],
      facebook: [null],
      instagram: [null],
      mail: [null, Validators.required],
    })
  }

  initEventForm() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      event: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  initHomeForm() {
    this.homeForm = this.formBuilder.group({
      title: ['', Validators.required],
    })
  }

  initEventTechForm() {
    this.techForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTechEvent: ['', Validators.required],
      location: ['', Validators.required],
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
      
        // Limpia el input de tipo file (si lo tienes en tu template)
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ''; // Resetea el valor del input
        }
        this.remainingCharacters = null;
      }
    })
  }

  createTheEvent() {
    this.generalService.createEvent(this.eventForm.value).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Evento rápido de Negocios de la App creado')
        this.eventForm.reset();
      }
    })
  }

  fileForHome(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  createTheHome() {
    const formData = new FormData();
    formData.append('title', this.homeForm.get('title')!.value);
    if (this.selectedFile) {
      formData.append('imageUrl', this.selectedFile, this.selectedFile.name);
    }
    this.generalService.createHome(formData).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Banner en el Inicio de la App creado')
        this.homeForm.reset();
      }
    })
  }
  
  productsLength(event: any) {
    const maxLength = 200;
    const currentLength = event.target.value.length;
    this.remainingCharacters = maxLength - currentLength;
  }

  createTechEvent() {
    const formData = new FormData();
    formData.append('title', this.techForm.get('title')!.value);
    formData.append('description', this.techForm.get('description')!.value);
    formData.append('dateTechEvent', this.techForm.get('dateTechEvent')!.value);
    formData.append('location', this.techForm.get('location')!.value);
    if (this.selectedFile) {
      formData.append('imageUrl', this.selectedFile, this.selectedFile.name);
    }
    this.generalService.createTechEvent(formData).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Evento Técnico de la App creado');
        this.techForm.reset();
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ''; // Resetea el valor del input
        }
      }
    })
  }



}
