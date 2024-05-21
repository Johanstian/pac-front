import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AlertService } from 'src/app/core/services/alert.service';
import { InterviewService } from 'src/app/core/services/interview.service';
import { EnlistmentStageComponent } from '../enlistment-stage/enlistment-stage.component';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-enlistment-stage-permanent',
  templateUrl: './enlistment-stage-permanent.component.html',
  styleUrls: ['./enlistment-stage-permanent.component.scss']
})
export class EnlistmentStagePermanentComponent implements OnInit {

  dataForm!: FormGroup;
  interviews: any;
  tests: any;
  page: number = 1;
  size: number = 5;
  selectedItem: number = 5;
  collectionSize: number = 0;
  loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private interviewService: InterviewService,
    private nbDialogService: NbDialogService,
    @Optional() private nbDialogRef: NbDialogRef<EnlistmentStageComponent>,
    private testService: TestService
    ) {

  }

  ngOnInit(): void {
    // this.initForm();
    // this.getInterviews();
    this.getTests();
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
    this.interviewService.getAllInterviews(this.page, this.size).subscribe({
      next: (data) => {
        this.interviews = data.interviews;
        this.collectionSize = data.totalPages;
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message)
      }
    })
  }

  getTests() {
    this.testService.getAllTests().subscribe({
      next: (data) => {
        this.tests = data;
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message)
      }
    })
  }

  nextPage() {
    this.getInterviews();
  }

  createInterview() {
    this.loading;
    this.interviewService.create(this.dataForm.value).subscribe({
      next: (data) => {
        this.loading = true;
        this.nbDialogRef.close();
        this.getInterviews();
        this.dataForm.reset();
      }
    })
  }


}
