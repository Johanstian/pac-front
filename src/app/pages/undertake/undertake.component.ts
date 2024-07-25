import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-undertake',
  templateUrl: './undertake.component.html',
  styleUrls: ['./undertake.component.scss']
})
export class UndertakeComponent implements OnInit {

  dataForm!: FormGroup;
  eventForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.initEventForm();
  }

  initForm() {
    this.dataForm = this.formBuilder.group({
      title: [null, Validators.required],
      subtitle: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      products: [null, Validators.required],
      facebook: [null, Validators.required],
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
        alert('producto creado');
        this.dataForm.reset();
      }
    })
  }

  createTheEvent() {
    this.generalService.createEvent(this.eventForm.value).subscribe({
      next: () => {
        alert('creado');
        this.eventForm.reset();
      }
    })
  }



}
