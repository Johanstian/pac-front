import { Component, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AlertService } from 'src/app/core/services/alert.service';
import { InterviewService } from 'src/app/core/services/interview.service';
import { EnlistmentStageComponent } from '../enlistment-stage/enlistment-stage.component';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';

@Component({
  selector: 'app-induction',
  templateUrl: './induction.component.html',
  styleUrls: ['./induction.component.scss']
})
export class InductionComponent {

  dataForm!: FormGroup;
  interviews: any;
  page: number = 1;
  size: number = 5;
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
    @Optional() private nbDialogRef: NbDialogRef<EnlistmentStageComponent>) {

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
    this.enlistmentService.getAllEnlistment().subscribe({
      next: (data) => {
        this.enlistments = data.enlistment;
        console.log('this.enlistments', this.enlistments)
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


}