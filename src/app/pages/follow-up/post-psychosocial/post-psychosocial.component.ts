import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AlertService } from 'src/app/core/services/alert.service';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';
import { InterviewService } from 'src/app/core/services/interview.service';
import { TestService } from 'src/app/core/services/test.service';
import { PdfComponent } from '../../enlistment/induction/pdf/pdf.component';
declare const html2pdf: any;

@Component({
  selector: 'app-post-psychosocial',
  templateUrl: './post-psychosocial.component.html',
  styleUrls: ['./post-psychosocial.component.scss']
})
export class PostPsychosocialComponent implements OnInit {

  @ViewChild('pdfContent') pdfContent!: ElementRef;
  dataForm!: FormGroup;
  interviews: any;
  page: number = 1;
  size: number = 10;
  selectedItem: number = 10;
  collectionSize: number = 0;
  loading: boolean = false;
  retests: any;
  currentDate: any;
  search: any = '';

  constructor(
    private alertService: AlertService,
    private enlistmentService: EnlistmentService,
    private formBuilder: FormBuilder,
    private interviewService: InterviewService,
    private nbDialogService: NbDialogService,
    @Optional() private nbDialogRef: NbDialogRef<any>,
    private testService: TestService
  ) {
    this.currentDate = new Date().toLocaleString();
  }

  ngOnInit(): void {
    this.getTests();
  }

  create(dialog: any) {
    this.nbDialogRef = this.nbDialogService.open(dialog)
  }

  close() {
    this.nbDialogRef.close()
  }

  getInterviews() {
    this.interviewService.getAllInterviews(this.page, this.size).subscribe({
      next: (data) => {
        this.interviews = data.interviews
          .filter((interview: any) => interview.initialInterview === "yes")
          .sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        this.collectionSize = data.totalPages;
      },
      error: (err) => {
      }
    });
  }

  getTests() {
    this.testService.getAll().subscribe({
      next: (data) => {
        this.retests = data.retests;
        this.collectionSize = data.totalPages;
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message)
      }
    })
  }

  nextPage() {
    this.getTests();
  }

  // pdfReport() {
  //   const contentHtml = this.pdfContent.nativeElement.innerHTML;
  //   const contentElement = document.createElement('div');
  //   contentElement.innerHTML = contentHtml;
  //   const opt = {
  //     margin: 10,
  //     filename: 'Análisis Final.pdf',
  //     image: { type: 'jpeg', quality: 0.8 },
  //     html2canvas: { scale: 2, scrollY: 0 },
  //     jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait', compress: false }
  //   };
  //   html2pdf().set(opt).from(contentElement).save();
  //   this.nbDialogRef.close();
  // }

  pdfReport(cc: any) {
    this.nbDialogService.open(PdfComponent, {
      context: {
        cc: cc
      }
    })
  }

  getList() {
    return this.search !== '' ? this.retests.filter((e: any) => e.cc.includes(this.search) || e.names.includes(this.search)) : this.retests;
  }

  excel() {
    this.testService.getExcel().subscribe(
      (excelBlob: Blob) => {
        const blob = new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Proceso Psicosocial Antiguos.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
    );
  }


}
