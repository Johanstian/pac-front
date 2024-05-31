import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { AlertService } from 'src/app/core/services/alert.service';
import { InterviewService } from 'src/app/core/services/interview.service';

@Component({
  selector: 'app-update-interview',
  templateUrl: './update-interview.component.html',
  styleUrls: ['./update-interview.component.scss']
})
export class UpdateInterviewComponent implements OnInit {

  @Input() cc: any;
  dataForm!: FormGroup;
  loading: boolean = false;
  interview: any;

  constructor(
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private interviewService: InterviewService,
    @Optional() private nbDialogRef: NbDialogRef<UpdateInterviewComponent>
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.interviewService.getInterByCc(this.cc).subscribe({
      next: (data) => {
        this.interview = data;
        const interviewDate = this.interview?.date ? new Date(this.interview?.date): null;
        this.dataForm = this.formBuilder.group({
          date: [interviewDate, Validators.required],
          cc: [this.cc, Validators.required],
          names: [this.interview?.names, Validators.required],
          cellphone: [this.interview?.cellphone, Validators.required],
          test: [this.interview?.test, Validators.required],
          review: [this.interview?.review, Validators.required],
          techLead: [this.interview?.techLead, Validators.required],
          interview: [this.interview?.interview, Validators.required],
          observations: [this.interview?.observations, Validators.required],
        })
      }
    })
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
      interview: ['', Validators.required],
      observations: ['', Validators.required],
    })
  }


  close() {
    this.nbDialogRef.close()
  }

  update() {
    this.interviewService.updateInterview(this.cc, this.dataForm.value).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Entrevista actualizada')
        this.close();
      },
      error: () => {
      }
    })
  }

}
