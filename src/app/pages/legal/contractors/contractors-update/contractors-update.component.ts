import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { ContractService } from 'src/app/core/services/contract.service';

@Component({
  selector: 'app-contractors-update',
  templateUrl: './contractors-update.component.html',
  styleUrls: ['./contractors-update.component.scss']
})
export class ContractorsUpdateComponent implements OnInit {

  documento!: any;
  contractor: any;
  dataForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private contractService: ContractService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.documento = params['documento']
      this.initForm();
      this.getContractor();
    });
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
    })
  }

  getContractor() {
    this.contractService.getOneContractor(this.documento).subscribe({
      next: (data) => {
        this.contractor = data;
        this.updateForm();
      }
    })
  }

  updateForm() {
    if (this.contractor) {
      this.dataForm.patchValue({
        documento: this.contractor.documento,
        contratista: this.contractor.contratista,
        invitacion: this.contractor.invitacion,
        identificado: this.contractor.identificado,
        oficio: this.contractor.oficio,
        fechacdp: this.contractor.fechacdp,
        actividad: this.contractor.actividad,
        tipo: this.contractor.tipo,
        requisitoestudios: this.contractor.requisitoestudios,
        requisitoexperiencia: this.contractor.requisitoexperiencia,
        alternativaestudio: this.contractor.alternativaestudio,
        alternativaexperiencia: this.contractor.alternativaexperiencia,
      });
    }
  }

  updateContractor() {
    this.contractService.updateContractor(this.documento, this.dataForm.value).subscribe({
      next: (resp) => {
        this.alertService.success('¡Correcto!', 'Contratista actualizado.');
        this.back();
      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message)
      }
    })
  }

  back() {
    this.location.back();
  }



}
