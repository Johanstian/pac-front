import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { ContractService } from 'src/app/core/services/contract.service';

@Component({
  selector: 'app-contractors-create',
  templateUrl: './contractors-create.component.html',
  styleUrls: ['./contractors-create.component.scss']
})
export class ContractorsCreateComponent implements OnInit {

  dataForm!: FormGroup;

  constructor(
    private alertService: AlertService,
    private contractService: ContractService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.dataForm = this.formBuilder.group({
      documento: [null, Validators.required],
      contratista: [null, Validators.required],
      invitacion: [null, Validators.required],
      identificado: [null, Validators.required],
      oficio: [null, Validators.required],
      fechacdp: [null, Validators.required],
      actividad: [null, Validators.required],
      tipo: [null, Validators.required],
      requisitoestudios: [null, Validators.required],
      requisitoexperiencia: [null, Validators.required],
      alternativaestudio: [null, Validators.required],
      alternativaexperiencia: [null, Validators.required],
      plazo: [null, Validators.required],
    })
  }

  createContractor() {
    this.contractService.createContractor(this.dataForm.value).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Contratista creado')
        this.dataForm.reset();
        this.back();
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    })
  }

  back() {
    this.location.back()
  }


}
