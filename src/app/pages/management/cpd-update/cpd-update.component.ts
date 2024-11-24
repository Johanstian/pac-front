import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { CdpService } from 'src/app/core/services/cdp.service';

@Component({
  selector: 'app-cpd-update',
  templateUrl: './cpd-update.component.html',
  styleUrls: ['./cpd-update.component.scss']
})
export class CpdUpdateComponent implements OnInit {

  id: any;
  cdpForm!: FormGroup;
  cdp: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private cdpSerivce: CdpService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCdp();
    this.initForm();
  }

  initForm() {
    this.cdpForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      documento: [null, Validators.required],
      autorizacion: ['', Validators.required],
      fecha: ['', Validators.required],
      concepto: ['', Validators.required],
      resumido: ['', Validators.required],
      largo: ['', Validators.required],
      nombrerubro: ['', Validators.required],
      valor: ['', Validators.required],
      valorletras: ['', Validators.required],
      codigo: ['', Validators.required],
      nombreproyecto: ['', Validators.required],
    })
  }

  getCdp() {
    this.cdpSerivce.getCdpByDocumentp(this.id).subscribe({
      next: (data) => {
        this.cdp = data;
        this.cdpForm.patchValue({
          nombres: this.cdp.nombres,
          documento: this.cdp.documento,
          autorizacion: this.cdp.autorizacion,
          fecha: this.cdp.fecha,
          concepto: this.cdp.concepto,
          resumido: this.cdp.resumido,
          largo: this.cdp.largo,
          nombrerubro: this.cdp.nombrerubro,
          valor: this.cdp.valor,
          valorletras: this.cdp.valorletras,
          codigo: this.cdp.codigo,
          nombreproyecto: this.cdp.nombreproyecto,
        })
      }
    })
  }

  back() {
    this.location.back();
  }

  update() {
    this.cdpSerivce.updateCdp(this.id, this.cdpForm.value).subscribe({
      next: (resp) => {
        this.alertService.success('¡Correcto!', 'CDP actualizado');
        this.back();
      },
      error: (err) => {
        this.alertService.success('¡Correcto!', err.error.message);
      }
    })
  }

}
