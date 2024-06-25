import { Component, ElementRef, ViewChild } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { AlertService } from 'src/app/core/services/alert.service';
import { PsicosocialService } from 'src/app/core/services/psicosocial.service';
import { TestService } from 'src/app/core/services/test.service';
declare const html2pdf: any;

@Component({
  selector: 'app-post-individual',
  templateUrl: './post-individual.component.html',
  styleUrls: ['./post-individual.component.scss']
})
export class PostIndividualComponent {

  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;
  value: any = '';
  single!: any[];
  view: any = [650, 350];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = false;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Puntaje';
  legendTitle: string = '';
  Below = LegendPosition.Right

  colorScheme: any = {
    domain: ['#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#1976D2', '#1565C0', '#1565C1', '#1565C0']
  };
  ceColor: any = {
    domain: ['#FFF9C4', '#FFFF72', '#F7D547', '#ECAB0F', '#F9A825', '#F57F17']
  };

  mColor: any = {
    domain: ['#B4FF9A', '#92E27A', '#71C55B', '#4EA93B', '#258D19', '#007B00']
  };

  cColor: any = {
    domain: ['#FF7676', '#FF4040', '#FF0000', '#E00000', '#C20000']
  };

  loading: boolean = false;
  testData1: any;
  savedData: any;
  cc: any;
  ce: any
  tdm: any
  ayd: any;
  result: any;
  averageValue: any;
  type: any;

  ccData: any;
  ceData: any;
  tdmData: any;
  formattedData: any;

  ccResult: any;
  ceResult: any;
  tdmResult: any;
  aydResult: any
  ccStringResult: any;
  tdmStringResult: any;
  aydStringResult: any;
  currentDate: any;
  retests: any;
  search: any = '';

  constructor(
    private alertService: AlertService,
    private testService: TestService,
    private psicosocialService: PsicosocialService
  ) {
    this.currentDate = new Date().toLocaleString();
  }

  ngOnInit(): void {
    this.getPost();
  }

  searching() {
    if (!this.value) {
      return;
    }
    this.loading = false;
    this.testService.getGeneralRetest(this.value).subscribe({
      next: (data) => {
        this.loading = true;
        this.result = data;
        this.ccResult = data.averageCC;
        this.ceResult = data.averageCE;
        this.tdmResult = data.totalM;
        this.aydResult = data.averageAyd;
        this.type = data.type
        this.cc = data;
        this.ce = data;
        this.tdm = data;
        this.ayd = data;
        const ccDataServer = this.cc;
        const ceDataServer = this.ce
        const tdmDataServer = this.tdm;
        const dataFromServer = this.ayd;
        this.ccData = [
          { name: 'Compromiso con la organización', value: +ccDataServer.cc1 },
          { name: 'Trabajo en Equipo', value: +ccDataServer.cc2 },
          { name: 'Adaptación al Cambio', value: +ccDataServer.cc3 },
          { name: 'Aprendizaje Continuo', value: +ccDataServer.cc4 },
          { name: 'Orientación al Resultado', value: +ccDataServer.cc5 },
          { name: 'Orientación al Usuario y al Ciudadano', value: +ccDataServer.cc6 },
        ];
        if (this.result.type === 'Test1' || this.result.type === 'Test3') {
          this.ceData = [
            { name: 'Gestión del Desarrollo de Personas', value: +ceDataServer.ce1 },
            { name: 'Pensamiento Sistémico', value: +ceDataServer.ce2 },
            { name: 'Resolución de Conflictos', value: +ceDataServer.ce3 },
            { name: 'Construcción de Relaciones', value: +ceDataServer.ce4 },
            { name: 'Conocimiento del Entorno', value: +ceDataServer.ce5 },
            { name: 'Colaboración', value: +ceDataServer.ce6 },
            { name: 'Manejo de la Información', value: +ceDataServer.ce7 },
          ];
        } else {
          this.ceData = [
            { name: 'Gestión del Desarrollo de Personas', value: +ceDataServer.ce1 },
            { name: 'Pensamiento Sistémico', value: +ceDataServer.ce2 },
            { name: 'Resolución de Conflictos', value: +ceDataServer.ce3 },
            { name: 'Construcción de Relaciones', value: +ceDataServer.ce4 },
            { name: 'Conocimiento del Entorno', value: +ceDataServer.ce5 },
            { name: 'Colaboración', value: +ceDataServer.ce6 },
            { name: 'Manejo de la Información', value: +ceDataServer.ce7 },
            { name: 'Relaciones Interpersonales', value: +ceDataServer.ce8 },
          ];
        }
        this.tdmData = [
          { name: 'Respuesta/. 1', value: +tdmDataServer.tm1 },
          { name: 'Respuesta/. 2', value: +tdmDataServer.tm2 },
          { name: 'Respuesta/. 3', value: +tdmDataServer.tm3 },
          { name: 'Respuesta/. 4', value: +tdmDataServer.tm4 },
          { name: 'Respuesta/. 5', value: +tdmDataServer.tm5 },
          { name: 'Respuesta/. 6', value: +tdmDataServer.tm6 },
          { name: 'Respuesta/. 7', value: +tdmDataServer.tm7 },
          { name: 'Respuesta/. 8', value: +tdmDataServer.tm8 },
        ];
        this.formattedData = [
          { name: 'Aspecto 1', value: +dataFromServer.ayd1 },
          { name: 'Aspecto 2', value: +dataFromServer.ayd2 },
          { name: 'Aspecto 3', value: +dataFromServer.ayd3 },
          { name: 'Aspecto 4', value: +dataFromServer.ayd4 }
        ];
        this.cc = this.ccData;
        this.ce = this.ceData;
        this.tdm = this.tdmData;
        this.ayd = this.formattedData;

        if ((this.ccResult >= 1 && this.ccResult <= 1.99) || (this.ceResult >= 1 && this.ceResult <= 1.99)) {
          this.ccStringResult = 'Baja';
        } else if ((this.ccResult >= 2 && this.ccResult <= 2.99) || (this.ceResult >= 2 && this.ceResult <= 2.99)) {
          this.ccStringResult = 'Moderada';
        } else if ((this.ccResult >= 3 && this.ccResult <= 4) || (this.ceResult >= 3 && this.ceResult <= 4)) {
          this.ccStringResult = 'Alta';
        } else {
          this.ccStringResult = 'Alta'; // ¿Es necesario este último 'else'?
        }
        

        if (this.tdmResult >= 0 && this.tdmResult <= 6) {
          this.tdmStringResult = 'Escasa';
        } else if (this.tdmResult >= 7 && this.tdmResult <= 15) {
          this.tdmStringResult = 'Moderada';
        } else if (this.tdmResult >= 16 && this.tdmResult <= 25) {
          this.tdmStringResult = 'Elevada';
        } else {
          this.tdmStringResult = 'Superior';
        }
        

        if (this.aydResult >= 1 && this.aydResult <= 1.99) {
          this.aydStringResult = 'Alta';
        } if (this.aydResult >= 2 && this.aydResult <= 2.99) {
          this.aydStringResult = 'Moderada';
        } else {
          this.aydStringResult = 'Baja';
        }
      },
      error: (error) => {
        this.alertService.error('¡Error!', error.error.message)
      }
    })
  }

  reset() {
    this.value = null;
    this.loading = false;
    this.result = null;
    this.ayd = null;
    this.formattedData = null;
    this.averageValue = null;
  }

  pdfReport() {
      const contentHtml = this.reportContent.nativeElement.innerHTML;
      const contentElement = document.createElement('div');
      contentElement.innerHTML = contentHtml;
      const opt = {
        margin: 10,
        filename: 'Análisis de Resultados - ' + this.result!.names + ' - ' + this.result!.cc + '.pdf',
        image: { type: 'jpeg', quality: 0.8 },
        html2canvas: { scale: 2, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait', compress: false }
      };
      html2pdf().set(opt).from(contentElement).save();
  }

  getResultParagraph(): string {
    if (this.ccStringResult === 'Baja') {
      return 'Se sugiere un seguimiento continuo y se establece un plan de fortalecimiento integral.';
    } else if (this.ccStringResult === 'Moderada') {
      return 'Se inicia un plan de fortalecimiento enfocado en áreas específicas de mejora';
    } else {
      return 'Reconocen y destacan significativamente, proporcionando retroalimentación positiva';
    }
  }

  getMesquite(): any {
    if (this.tdmStringResult === 'Superior') {
      return 'Realmente has alcanzado el top de la inteligencia emocional. Tal vez seas un niño sencillo con una gran comprensión de lo que ocurre en tu entorno. Esto puede llevarte a ser muy sensible en ciertas ocasiones pero tú sabes cómo responder ante esto. Eres una perla para tus compañeros y entorno así que valora lo que eres y recuerda siempre que con humildad se consigue más que por la fuerza. Enseña con el ejemplo aquello que ya eres naturalmente.';
    } else if (this.tdmStringResult === 'Elevada') {
      return 'Si has alcanzado esta puntuación ¡enhorabuena! Eres una persona con cierto nivel o grado de inteligencia emocional. Sabes reconocer cuándo otras personas están tristes. Puedes leer el lenguaje corporal y actuar en consecuencia de cada situación. Recuerda que lo que tienes es una herramienta muy valorable. Enseña a otros sobre la inteligencia emocional y nunca dejes de sentir empatía por tu entorno.';
    } else if (this.tdmStringResult === 'Moderada') {
      return 'Ya sabes lo que es la inteligencia emocional y en parte la llevas a la práctica. Sin embargo, ¡puedes mejorar! Debes saber que el conocimiento de otros nos hace más ricos internamente y nos fortalece. Además las personas valorarán el esfuerzo ¡No te rindas y sigue adelante!';
    } else {
      return 'Tienes poca inteligencia emocional lo que significa que debes desarrollar la misma mediante ejercicios y juegos. Ten en cuenta que todo se aprende y no te sientas mal pero sí considera aprender sobre esta gran estrategia que te permitirá conocer más a quienes te rodean.'
    }
  }

  getBehavior(): string {
    if (this.aydStringResult === 'Baja') {
      return 'Rango normal.';
    } else if (this.aydStringResult === 'Moderada') {
      return 'Ligeramente.';
    } else {
      return 'Moderadamente.';
    }
  }

  getPost() {
    this.psicosocialService.getAllPsico().subscribe({
      next: (data) => {
        this.retests = data.retests
      },
      error: () => {
      }
    })
  }

  getList() {
    const searchLower = this.search.toLowerCase();
    return this.search !== '' ? this.retests.filter((a: any) => a.cc.toLocaleString().toLowerCase().includes(searchLower) || a.names.toLocaleString().toLowerCase().includes(searchLower)) : [];
  }


}