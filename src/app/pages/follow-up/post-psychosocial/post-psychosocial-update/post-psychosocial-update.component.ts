import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';
import { InterviewService } from 'src/app/core/services/interview.service';
import { PsicosocialService } from 'src/app/core/services/psicosocial.service';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-post-psychosocial-update',
  templateUrl: './post-psychosocial-update.component.html',
  styleUrls: ['./post-psychosocial-update.component.scss']
})
export class PostPsychosocialUpdateComponent implements OnInit {

  dataForm!: FormGroup;
  cc!: number;
  contractor: any;
  isShow: boolean = false;
  selectedOption: any = new FormControl()
  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private enlistmentService: EnlistmentService,
    private interviewService: InterviewService,
    private formBuilder: FormBuilder,
    private location: Location,
    private psicosocialService: PsicosocialService,
    private testService: TestService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.cc = params['cc'];
      this.getInterview();
    });
    this.initForm();
  }

  initForm() {
    const names = this.contractor ? this.contractor.names : '';
    const cc = this.contractor ? this.contractor.cc : '';
    const test = this.contractor ? this.contractor.type : '';

    this.dataForm = this.formBuilder.group({
      names: [names, Validators.required],
      cc: [cc, Validators.required],
      test: [test, Validators.required],
      workExperience: ['', Validators.required],
      sanity: ['', Validators.required],
      aptitudes: ['', Validators.required],
      nonVerbal: ['', Validators.required],
      finalReport: ['', Validators.required],
      technical: [''],
    });
  }

  getInterview() {
    this.testService.getGeneralRetest(this.cc).subscribe({
      next: (data) => {
        this.contractor = data;
        this.initForm();
      },
      error: () => {
        this.alertService.error('¡Error!', 'El contratista aún no ha contestado el Test');
        this.return();
      }
    })
  }

  return() {
    this.location.back();
  }

  createEnlistment() {
    this.loading = true;
    this.psicosocialService.createPsicosocial(this.dataForm.value).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Reporte de ' + this.contractor?.names + ' creado.');
        this.return();
        this.loading = false;
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
        this.loading = false;
      }
    })
  }

  fields() {
    this.isShow = !this.isShow;
  }

  onSelectChange(option: string) {
    this.selectedOption = option;
  }

}
