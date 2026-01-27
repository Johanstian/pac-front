import { Component, ElementRef, ViewChild } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { AlertService } from 'src/app/core/services/alert.service';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';
import { TestService } from 'src/app/core/services/test.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent {

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
  loadingSearch: boolean = false;
  generatingPdf: boolean = false;
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
  enlistments: any;
  search: any = '';

  constructor(
    private alertService: AlertService,
    private enlistmentService: EnlistmentService,
    private testService: TestService
  ) {
    this.currentDate = new Date().toLocaleString();
  }

  ngOnInit(): void {
    this.getEnlist();
  }

  searching() {
    if (!this.value) {
      return;
    }
    
    if (this.loadingSearch) {
      return; // Evitar múltiples llamados
    }
    
    this.loadingSearch = true;
    this.loading = false;
    this.testService.getGeneralTest(this.value).subscribe({
      next: (data) => {
        this.loading = true;
        this.loadingSearch = false;
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
        this.loadingSearch = false;
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

  // Método simple para descargar PDF ligero con texto real (frontend)
  pdfReportFromBackend() {
    if (!this.result) {
      this.alertService.error('Error', 'No hay datos para generar el PDF.');
      return;
    }

    this.generatingPdf = true;

    try {
      const pdf = new jsPDF('p', 'mm', 'a3');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      let yPos = margin;

      // Función auxiliar para agregar texto
      const addText = (text: string, fontSize: number, isBold: boolean = false, align: 'left' | 'center' | 'right' = 'left') => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
        const lines = pdf.splitTextToSize(text, pageWidth - (2 * margin));
        const pageHeight = pdf.internal.pageSize.getHeight();
        const lineHeight = fontSize * 0.5;
        
        lines.forEach((line: string) => {
          if (yPos + lineHeight > pageHeight - margin) {
            pdf.addPage();
            yPos = margin;
          }
          // Calcular posición X según la alineación
          let xPos = margin;
          if (align === 'center') {
            xPos = pageWidth / 2;
          } else if (align === 'right') {
            xPos = pageWidth - margin;
          }
          pdf.text(line, xPos, yPos, { align });
          yPos += lineHeight;
        });
      };

      // Encabezado
      addText('ANÁLISIS DE RESULTADOS', 20, true, 'center');
      yPos += 5;
      pdf.setFontSize(10);
      const dateText = 'Impresión: ' + this.currentDate;
      pdf.text(dateText, pageWidth - margin - pdf.getTextWidth(dateText), yPos);
      yPos += 10;

      // Información del paciente (en cursiva)
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'italic');
      pdf.text('Nombre: ' + this.result.names, margin, yPos);
      yPos += 6;
      pdf.text('C.C.: ' + this.result.cc, margin, yPos);
      yPos += 6;
      pdf.text('Test: ' + this.result.type, margin, yPos);
      yPos += 10;

      // Variables para layout de dos columnas
      const tableWidth = (pageWidth - (3 * margin)) / 2;
      const resultStartX = pageWidth / 2 + margin / 2;
      const leftColumnCenter = margin + tableWidth / 2;
      const rightColumnCenter = resultStartX + tableWidth / 2;

      // Competencias Comunes (centrado en su columna izquierda)
      const sectionTitleY = yPos;
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Competencias Comunes', leftColumnCenter, sectionTitleY, { align: 'center' });
      
      // Subtítulo "Resultado" centrado en su columna derecha, al mismo nivel que el título
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Resultado', rightColumnCenter, sectionTitleY, { align: 'center' });
      
      yPos += 8;
      
      // Tabla a la izquierda (mitad izquierda de la página)
      const ccTableData = this.ccData.map((item: any) => [item.name, item.value.toString()]);
      autoTable(pdf, {
        head: [['Competencia Común', 'Puntaje']],
        body: ccTableData,
        startY: yPos,
        margin: { left: margin, right: margin + tableWidth },
        tableWidth: tableWidth,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold' },
        columnStyles: { 1: { halign: 'right' } }
      });
      
      const tableEndY = (pdf as any).lastAutoTable.finalY;
      yPos = tableEndY + 5;
      
      // Promedio debajo de la tabla
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Promedio: ' + this.result.averageCC + ' - ' + this.ccStringResult, margin, yPos);
      
      // Resultado a la derecha (mitad derecha de la página)
      const resultStartY = yPos - (tableEndY - sectionTitleY - 8); // Alinear con el inicio de la tabla
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const resultText = this.getResultParagraph();
      const resultLines = pdf.splitTextToSize(resultText, tableWidth);
      pdf.text(resultLines, resultStartX, resultStartY);
      
      yPos = Math.max(yPos, resultStartY + (resultLines.length * 4)) + 15;

      // Competencias Específicas (centrado en su columna izquierda)
      const sectionTitleY2 = yPos;
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Competencias Específicas', leftColumnCenter, sectionTitleY2, { align: 'center' });
      
      // Subtítulo "Resultado" centrado en su columna derecha
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Resultado', rightColumnCenter, sectionTitleY2, { align: 'center' });
      
      yPos += 8;
      
      // Tabla a la izquierda
      const ceTableData = this.ceData.map((item: any) => [item.name, item.value.toString()]);
      autoTable(pdf, {
        head: [['Competencia Específica', 'Puntaje']],
        body: ceTableData,
        startY: yPos,
        margin: { left: margin, right: margin + tableWidth },
        tableWidth: tableWidth,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold' },
        columnStyles: { 1: { halign: 'right' } }
      });
      
      const tableEndY2 = (pdf as any).lastAutoTable.finalY;
      yPos = tableEndY2 + 5;
      
      // Promedio debajo de la tabla
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Promedio: ' + this.result.averageCE + ' - ' + this.ccStringResult, margin, yPos);
      
      // Resultado a la derecha
      const resultStartY2 = yPos - (tableEndY2 - sectionTitleY2 - 8);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const resultText2 = this.getResultParagraph();
      const resultLines2 = pdf.splitTextToSize(resultText2, tableWidth);
      pdf.text(resultLines2, resultStartX, resultStartY2);
      
      yPos = Math.max(yPos, resultStartY2 + (resultLines2.length * 4)) + 15;

      // Test de Mesquite (centrado en su columna izquierda)
      const sectionTitleY3 = yPos;
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Test de Mesquite', leftColumnCenter, sectionTitleY3, { align: 'center' });
      
      // Subtítulo "Resultado" centrado en su columna derecha
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Resultado', rightColumnCenter, sectionTitleY3, { align: 'center' });
      
      yPos += 8;
      
      // Tabla a la izquierda
      const tdmTableData = this.tdmData.map((item: any) => [item.name, item.value.toString()]);
      autoTable(pdf, {
        head: [['Respuestas', 'Puntaje']],
        body: tdmTableData,
        startY: yPos,
        margin: { left: margin, right: margin + tableWidth },
        tableWidth: tableWidth,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold' },
        columnStyles: { 1: { halign: 'right' } }
      });
      
      const tableEndY3 = (pdf as any).lastAutoTable.finalY;
      yPos = tableEndY3 + 5;
      
      // Total debajo de la tabla
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Total: ' + this.result.totalM + ' - ' + this.tdmStringResult, margin, yPos);
      
      // Resultado a la derecha
      const resultStartY3 = yPos - (tableEndY3 - sectionTitleY3 - 8);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const mesquiteText = this.getMesquite();
      const mesquiteLines = pdf.splitTextToSize(mesquiteText, tableWidth);
      pdf.text(mesquiteLines, resultStartX, resultStartY3);
      
      yPos = Math.max(yPos, resultStartY3 + (mesquiteLines.length * 4)) + 15;

      // Ansiedad y Depresión (centrado en su columna izquierda)
      const sectionTitleY4 = yPos;
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Ansiedad y Depresión', leftColumnCenter, sectionTitleY4, { align: 'center' });
      
      // Subtítulo "Resultado" centrado en su columna derecha
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Resultado', rightColumnCenter, sectionTitleY4, { align: 'center' });
      
      yPos += 8;
      
      // Tabla a la izquierda
      const aydTableData = this.formattedData.map((item: any) => [item.name, item.value.toString()]);
      autoTable(pdf, {
        head: [['Respuestas', 'Puntaje']],
        body: aydTableData,
        startY: yPos,
        margin: { left: margin, right: margin + tableWidth },
        tableWidth: tableWidth,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [255, 255, 255], textColor: 0, fontStyle: 'bold' },
        columnStyles: { 1: { halign: 'right' } }
      });
      
      const tableEndY4 = (pdf as any).lastAutoTable.finalY;
      yPos = tableEndY4 + 5;
      
      // Promedio debajo de la tabla
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Promedio: ' + this.result.averageAyd + ' - ' + this.aydStringResult, margin, yPos);
      
      // Resultado a la derecha
      const resultStartY4 = yPos - (tableEndY4 - sectionTitleY4 - 8);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const behaviorText = this.getBehavior();
      const behaviorLines = pdf.splitTextToSize(behaviorText, tableWidth);
      pdf.text(behaviorLines, resultStartX, resultStartY4);

      // Guardar PDF
      pdf.save('Análisis de Resultados - ' + this.result.names + ' - ' + this.result.cc + '.pdf');
    } catch (error: any) {
      console.error('Error al generar PDF:', error);
      this.alertService.error('Error', 'No se pudo generar el PDF.');
    } finally {
      this.generatingPdf = false;
    }
  }

  // Método original usando html2pdf.js (frontend)
  // Método usando html2pdf.js (frontend) - mantener como respaldo
  async pdfReport() {
      if (!this.reportContent || !this.reportContent.nativeElement) {
        this.alertService.error('Error', 'El contenido del reporte no está disponible.');
        return;
      }

      if (!this.result) {
        this.alertService.error('Error', 'No hay datos para generar el PDF.');
        return;
      }

      this.generatingPdf = true;

      try {
        const element = this.reportContent.nativeElement;
        const filename = 'Análisis de Resultados - ' + this.result.names + ' - ' + this.result.cc + '.pdf';

        // Crear un elemento temporal visible fuera de la vista para html2pdf
        const tempElement = document.createElement('div');
        tempElement.style.position = 'absolute';
        tempElement.style.left = '-9999px';
        tempElement.style.top = '0';
        tempElement.style.width = '210mm';
        tempElement.style.backgroundColor = 'white';
        tempElement.style.padding = '20px';
        
        // Clonar el contenido HTML
        tempElement.innerHTML = element.innerHTML;
        
        // Agregar al DOM temporalmente
        document.body.appendChild(tempElement);

        // Esperar un momento para que el DOM se actualice
        await new Promise(resolve => setTimeout(resolve, 100));

        const opt: any = {
          margin: 10,
          filename: filename,
          image: { type: 'jpeg', quality: 0.6 }, // Calidad reducida para PDF más ligero
          html2canvas: { 
            scale: 1.5, // Escala reducida para PDF más ligero
            scrollY: 0,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a3', 
            orientation: 'portrait',
            compress: true // Habilitar compresión
          }
        };

        // Usar la API Promise-based de html2pdf.js
        // await html2pdf().set(opt).from(tempElement).save();

        // Limpiar el elemento temporal
        document.body.removeChild(tempElement);
      } catch (error: any) {
        console.error('Error al generar PDF:', error);
        this.alertService.error('Error', 'No se pudo generar el PDF: ' + (error.message || 'Error desconocido'));
      } finally {
        this.generatingPdf = false;
      }
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

  getEnlist() {
    this.enlistmentService.getAll().subscribe({
      next: (data) => {
        this.enlistments = data
      },
      error: () => {
      }
    })
  }

  getList() {
    const searchLower = this.search.toLowerCase();
    return this.search !== '' ? this.enlistments.filter((a: any)=> a.cc.toLocaleString().toLowerCase().includes(searchLower) || a.names.toLocaleString().toLowerCase().includes(searchLower)) : [];
  }


}