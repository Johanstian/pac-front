import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AlertService } from 'src/app/core/services/alert.service';
import { InterviewService } from 'src/app/core/services/interview.service';

@Component({
  selector: 'app-pre-enlistment-stage',
  templateUrl: './pre-enlistment-stage.component.html',
  styleUrls: ['./pre-enlistment-stage.component.scss']
})
export class PreEnlistmentStageComponent implements OnInit {

  dataForm!: FormGroup;
  interviews: any;
  page: number = 1;
  size: number = 10;
  selectedItem: number = 10;
  collectionSize: number = 0;
  loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private interviewService: InterviewService,
    private nbDialogService: NbDialogService,
    @Optional() private nbDialogRef: NbDialogRef<PreEnlistmentStageComponent>) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getInterviews();
  }

  initForm() {
    this.dataForm = this.formBuilder.group({
      date: ['', Validators.required],
      cc: ['', Validators.required],
      names: ['', Validators.required],
      cellphone: ['', Validators.required],
      test: ['', Validators.required],
      review: ['', Validators.required],
      techLead: ['', Validators.required],
      // line: ['', Validators.required],
      interview: ['', Validators.required],
      observations: ['', Validators.required],
    })
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
        this.interviews = data.interviews.sort((a: any, b: any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        this.interviews = data.interviews;
        this.collectionSize = data.totalPages;
      },
      error: (err) => {
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
        this.alertService.success('¡Correcto!', 'Entrevista creada.')
      }
    })
  }


}
