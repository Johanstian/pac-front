import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';
import { InterviewService } from 'src/app/core/services/interview.service';

@Component({
  selector: 'app-enlistment-stage-permanent-update',
  templateUrl: './enlistment-stage-permanent-update.component.html',
  styleUrls: ['./enlistment-stage-permanent-update.component.scss']
})
export class EnlistmentStagePermanentUpdateComponent implements OnInit {

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
    private location: Location
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
      workExperience: [''],
      sanity: [''],
      aptitudes: [''],
      nonVerbal: [''],
      finalReport: ['', Validators.required],
    });
  }

  getInterview() {
    this.interviewService.getInterviewsByCC(this.cc).subscribe({
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
    this.enlistmentService.create(this.dataForm.value).subscribe({
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
