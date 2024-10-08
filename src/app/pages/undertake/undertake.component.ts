import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { saveAs } from 'file-saver';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-undertake',
  templateUrl: './undertake.component.html',
  styleUrls: ['./undertake.component.scss']
})
export class UndertakeComponent implements OnInit {

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
  user: any = {
    objeto: 'PRESTAR LOS SERVICIOS DE APOYO A LA GESTIÓN POR SUS PROPIOS MEDIOS CON PLENA AUTONOMÍA TÉCNICA Y ADMINISTRATIVA, PARA EL DESARROLLO DEL PROYECTO ESTRATÉGICO DENOMINADO: “FORTALECIMIENTO DE LA PARTICIPACIÓN E INCLUSIÓN DE LA POBLACIÓN EN RECREACIÓN, ACTIVIDAD FÍSICA, DEPORTE FORMATIVO Y SOCIAL COMUNITARIO EN EL VALLE DEL CAUCA”',
    cdp: '0987',
    res: '',
    rubro: '',
    nombrerubro: '',
    value: '$ 30.000.000',
    letters: 'TREINTA MILLONES DE PESOS',
    contrato: 'IND-24-1234',
    proceso: 'IND-24-1234',
    noconcepto: '5544',
    fechaconcepto: '12 de septiembre de 2024',
    cc: '1130627447',
    tercero: 'Johan Lopez',
    tipocontrato: 'Profesional',
    elaborado: 'Nombre quien elabora'
  };

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.initEventForm();
    this.initHomeForm();
    this.initEventTechForm();
    this.initRpForm();
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

  initRpForm() {
    this.rpForm = this.formBuilder.group({
      nameField: [''],
      dateField: [''],
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

  async rp() {
    const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      // rotate: degrees(-45),
    })

    const pdfBytes = await pdfDoc.save()
  }


  async generatePdf() {
    try {
      const pdfBytes = await this.generalService.createPdf();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'generated_pdf.pdf';
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  async modifyPdf() {
    try {
      const pdfUrl = 'assets/pdf/rp2.pdf';
      const existingPdfBytes = await this.http.get(pdfUrl, { responseType: 'arraybuffer' }).toPromise() as Uint8Array;

      const modifiedPdfBytes = await this.generalService.modifyPdf(existingPdfBytes, this.user);

      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'RP.pdf';
      link.click();
    } catch (error) {
      console.error('Error al generar el PDF, ponte en contacto con Johan:', error);
    }
  }

  onRubroChange(selectedRubro: string) {
    const selectedRubroObj = this.rubros.find(rubro => rubro.code === selectedRubro);
    if (selectedRubroObj) {
      this.user.nombrerubro = selectedRubroObj.name;
    } else {
      this.user.nombrerubro = null;
    }
  }

  isFormValid(): boolean {
    return this.user.rubro.trim() !== '' && this.user.nombrerubro.trim() !== '';
  }


  onResChange(resValue: string) {
    // Encontrar el rubro correspondiente al código RES seleccionado
    const selectedRubro = this.rubros.find(r => r.res === resValue);
    
    if (selectedRubro) {
      // Actualizar el código de rubro y el nombre del rubro
      this.user.rubro = selectedRubro.code;
      this.user.nombrerubro = selectedRubro.name;
    } else {
      // Limpiar los valores si no se encuentra un rubro
      this.user.rubro = '';
      this.user.nombrerubro = '';
    }
  }



}
