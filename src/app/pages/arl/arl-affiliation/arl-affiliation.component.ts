import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { ArlService } from 'src/app/core/services/arl.service';

@Component({
  selector: 'app-arl-affiliation',
  templateUrl: './arl-affiliation.component.html',
  styleUrls: ['./arl-affiliation.component.scss']
})
export class ArlAffiliationComponent implements OnInit {

  arlForm!: FormGroup;

  constructor(
    private alertService: AlertService,
    private arlService: ArlService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.arlForm = this.formBuilder.group({
      arlName: ['', Validators.required],
      documentType: ['', Validators.required],
      cc: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      firstSurname: ['', Validators.required],
      secondSurname: ['', Validators.required],
      birthday: ['', Validators.required],
      sex: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      cellphone: ['', Validators.required],
      eps: ['', Validators.required],
      afp: ['', Validators.required],
      city: ['', Validators.required],
    })
  }

  create() {
    this.arlService.createArl(this.arlForm.value).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Información para la afiliación a la ARL enviada')
        this.arlForm.reset();
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message)
      }
    })
  }

}
