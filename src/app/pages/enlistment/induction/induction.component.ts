import { Component, ElementRef, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AlertService } from 'src/app/core/services/alert.service';
import { InterviewService } from 'src/app/core/services/interview.service';
import { EnlistmentStageComponent } from '../enlistment-stage/enlistment-stage.component';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';
import { PdfComponent } from './pdf/pdf.component';
declare const html2pdf: any;

@Component({
  selector: 'app-induction',
  templateUrl: './induction.component.html',
  styleUrls: ['./induction.component.scss']
})
export class InductionComponent {

  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;
  dataForm!: FormGroup;
  interviews: any;
  page: number = 1;
  size: number = 10;
  selectedItem: number = 5;
  collectionSize: number = 0;
  loading: boolean = false;
  cc: any;
  enlistments: any;
  search: any = '';

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private enlistmentService: EnlistmentService,
    private interviewService: InterviewService,
    private nbDialogService: NbDialogService,
    @Optional() private nbDialogRef: NbDialogRef<EnlistmentStageComponent>) {

  }

  ngOnInit(): void {
    this.getInterviews();
  }

  create(dialog: any) {
    this.nbDialogRef = this.nbDialogService.open(dialog)
  }

  close() {
    this.nbDialogRef.close()
  }

  getInterviews() {
    this.enlistmentService.getAll().subscribe({
      next: (data) => {
        this.enlistments = data
      },
      error: () => {
      }
    })
  }

  nextPage() {
    this.getInterviews();
  }

  createInterview() {
    this.loading;
    this.interviewService.create(this.dataForm.value).subscribe({
      next: () => {
        this.loading = true;
        this.nbDialogRef.close();
        this.getInterviews();
        this.dataForm.reset();
      }
    })
  }

  downloadPDF(cc: any): void {
    this.enlistmentService.pdf(cc).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  pdfReport(cc: any) {
    this.nbDialogService.open(PdfComponent, {
      context: {
        cc: cc
      }
    })
  }

  excel() {
    this.enlistmentService.getExcel().subscribe(
      (excelBlob: Blob) => {
        const blob = new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Informes finales.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
    );
  }

  getList() {
    return this.search !== '' ? this.enlistments.filter((a: any) => a.cc.toString().toLowerCase().includes(this.search) || a.names.toString().toLowerCase().includes(this.search)) : this.enlistments
  }



}
