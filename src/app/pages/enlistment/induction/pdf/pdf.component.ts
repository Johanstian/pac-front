import { AfterViewInit, Component, ElementRef, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';
import { PsicosocialService } from 'src/app/core/services/psicosocial.service';
declare const html2pdf: any;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements AfterViewInit {

  @ViewChild('pdfContent') pdfContent!: ElementRef;
  @Input() cc: any;
  enlistment: any;
  currentDate: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private enlistmentService: EnlistmentService,
    private psicosocialService: PsicosocialService,
    @Optional() private nbDialogRef: NbDialogRef<PdfComponent>
  ) {
    this.currentDate = new Date().toLocaleString();
  }

  ngAfterViewInit(): void {
    this.psicosocialService.getPostpsicosocialById(this.cc).subscribe({
      next: (data) => {
        this.enlistment = data;
        setTimeout(()=> {
          this.pdfReport();
        }, 1)
      }
    });
  }

  pdfReport() {
    const contentHtml = this.pdfContent.nativeElement.innerHTML;
    const contentElement = document.createElement('div');
    contentElement.innerHTML = contentHtml;
    const opt = {
      margin: 10,
      filename: 'Análisis Final - ' + this.enlistment!.names + ' - ' + this.enlistment!.cc + '.pdf',
      image: { type: 'jpeg', quality: 0.8 },
      html2canvas: { scale: 2, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait', compress: false }
    };
    html2pdf().set(opt).from(contentElement).save();
    this.nbDialogRef.close();
  }

}
