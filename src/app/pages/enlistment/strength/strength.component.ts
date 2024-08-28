import { Component, ElementRef, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AlertService } from 'src/app/core/services/alert.service';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';
import { InterviewService } from 'src/app/core/services/interview.service';
import { PdfComponent } from '../induction/pdf/pdf.component';

@Component({
  selector: 'app-strength',
  templateUrl: './strength.component.html',
  styleUrls: ['./strength.component.scss']
})
export class StrengthComponent {

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
    @Optional() private nbDialogRef: NbDialogRef<any>) {

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

  getList() {
    return this.search !== '' ? this.enlistments.filter((a: any) => a.cc.toString().toLowerCase().includes(this.search) || a.names.toString().toLowerCase().includes(this.search)) : this.enlistments
  }



}
