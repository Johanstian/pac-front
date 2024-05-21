import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AlertService } from 'src/app/core/services/alert.service';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';
import { InterviewService } from 'src/app/core/services/interview.service';
import { PdfComponent } from '../../enlistment/induction/pdf/pdf.component';
import { PsicosocialService } from 'src/app/core/services/psicosocial.service';

@Component({
  selector: 'app-post-strength',
  templateUrl: './post-strength.component.html',
  styleUrls: ['./post-strength.component.scss']
})
export class PostStrengthComponent implements OnInit {

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

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private enlistmentService: EnlistmentService,
    private interviewService: InterviewService,
    private nbDialogService: NbDialogService,
    @Optional() private nbDialogRef: NbDialogRef<any>,
    private psicosocialService: PsicosocialService
  ) {

  }

  ngOnInit(): void {
    // this.initForm();
    this.getInterviews();
  }

  // initForm() {
  //   this.dataForm = this.formBuilder.group({
  //     names: ['', Validators.required],
  //     cc: ['', Validators.required],
  //     test: ['', Validators.required],
  //     workExperience: ['', Validators.required],
  //     sanity: ['', Validators.required],
  //     aptitudes: ['', Validators.required],
  //     nonVerbal: ['', Validators.required],
  //     finalReport: ['', Validators.required],
  //     strength: ['', Validators.required],
  //     techConcept: ['', Validators.required],
  //   })
  // }

  create(dialog: any) {
    this.nbDialogRef = this.nbDialogService.open(dialog)
  }

  close() {
    this.nbDialogRef.close()
  }

  console() {
  }

  getInterviews() {
    this.psicosocialService.getAllPsicosocial().subscribe({
      next: (data) => {
        this.enlistments = data.enlistment;
        this.collectionSize = data.totalPages
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



}
