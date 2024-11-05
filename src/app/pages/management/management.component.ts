import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { saveAs } from 'file-saver';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {

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
    objeto: '',
    cdp: '',
    res: '',
    rubro: '',
    nombrerubro: '',
    value: '',
    letters: '',
    contrato: '',
    proceso: '',
    noconcepto: '',
    fechaconcepto: '',
    cc: '',
    tercero: '',
    tipocontrato: '',
    elaborado: ''
  };

  cdp: any = {
    aut: '',
    fechaaut: '',
    objeto: '',
    res: '',
    rubro: '',
    desrubro: '',
    valor: '',
    valorletras: '',
    codproyecto: '',
    nomproyecto: '',
  }

  cdpsi: any = {
    aut: '',
    fechaaut: '',
    objeto: '',
    res: '',
    rubro: '',
    desrubro: '',
    valor: '',
    valorletras: '',
    codproyecto: '',
    nomproyecto: '',
    documento: '',
    tercero: '',
    mensual: '',
    mensualletras: '',
  }

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {
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

  fileForHome(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
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
      alert(error)
    }
  }

  async modifyPdf() {
    try {
      const pdfUrl = 'assets/pdf/rp.pdf';
      const existingPdfBytes = await this.http.get(pdfUrl, { responseType: 'arraybuffer' }).toPromise() as Uint8Array;
      const modifiedPdfBytes = await this.generalService.modifyPdf(existingPdfBytes, this.user);
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'RP.pdf';
      link.click();
    } catch (error) {
      alert('Error al generar el PDF, ponte en contacto con Johan:');
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
    const selectedRubro = this.rubros.find(r => r.res === resValue);

    if (selectedRubro) {
      this.user.rubro = selectedRubro.code;
      this.user.nombrerubro = selectedRubro.name;
    } else {
      this.user.rubro = '';
      this.user.nombrerubro = '';
    }
  }

  async createCdp() {
    try {
      const pdfUrl = 'assets/pdf/CERTDIS.pdf';
      const existingPdfBytes = await this.http.get(pdfUrl, { responseType: 'arraybuffer' }).toPromise() as Uint8Array;
      const modifiedPdfBytes = await this.generalService.cdp(existingPdfBytes, this.cdp);
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'CDP.pdf';
      link.click();
      this.dataForm.reset();
    } catch (error) {
      alert('Error al generar el PDF, ponte en contacto con Johan:');
    }
  }

  isCdpValid(): boolean {
    return this.cdp.rubro.trim() !== '' && this.cdp.nombrerubro.trim() !== '';
  }




}
