import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';
import { InterviewService } from 'src/app/core/services/interview.service';

@Component({
  selector: 'app-induction-update',
  templateUrl: './induction-update.component.html',
  styleUrls: ['./induction-update.component.scss']
})
export class InductionUpdateComponent implements OnInit {

  dataForm!: FormGroup;
  interviews: any;
  cc: any;
  technical: any;
  page: any = 1
  size: any = 5;
  response: any;
  ccResult: any;
  ceResult: any;
  tdmResult: any;
  aydResult: any;
  type: any;
  common: any;
  ce: any;
  tdm: any;
  ayd: any;
  ccData: any;
  ceData: any;
  tdmData: any;
  formattedData: any;
  ccStringResult: any;
  tdmStringResult: any;
  aydStringResult: any;

  constructor
    (
      private activatedRoute: ActivatedRoute,
      private alertService: AlertService,
      private enlistmentService: EnlistmentService,
      private formBuilder: FormBuilder,
      private interviewService: InterviewService,
      private location: Location
    ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.cc = params['cc'];
      this.getEnlistment();
      this.initForm();
      this.getInterviews();
    });
  }

  initForm() {
    this.dataForm = this.formBuilder.group({
      names: [''],
      cc: [''],
      test: [''],
      workExperience: [''],
      sanity: [''],
      aptitudes: [''],
      nonVerbal: [''],
      finalReport: [''],
      technical: [''],
    })
  }

  getEnlistment() {
    this.enlistmentService.getEnlistmentById(this.cc).subscribe({
      next: (data) => {
        this.response = data;
        this.dataForm = this.formBuilder.group({
          names: [this.response.names],
          cc: [this.response.cc],
          test: [this.response.test],
          workExperience: [this.response.workExperience],
          sanity: [this.response.sanity],
          aptitudes: [this.response.aptitudes],
          nonVerbal: [this.response.nonVerbal],
          finalReport: [this.response.finalReport],
          technical: ['', Validators.required],
        })
      }
    })
  }

  createTechField() {
    this.enlistmentService.addTechnicalToEnlistment(this.dataForm.value).subscribe({
      next: () => {
        this.alertService.success('¡Correcto!', 'Concepto técnico agredado');
        this.location.back();
        this.dataForm.reset();
      },
      error: (err) => {
        alert('Error al agregar campo técnico: ' + err.error.message);
      }
    });
  }

  getInterviews() {
    this.interviewService.getInterviewsByCC(this.cc).subscribe({
      next: (data) => {
        this.interviews = data;
        this.ccResult = data.averageCC;
        this.ceResult = data.averageCE;
        this.tdmResult = data.totalM;
        this.aydResult = data.averageAyd;
        this.type = data.type
        this.common = data;
        this.ce = data;
        this.tdm = data;
        this.ayd = data;
        const ccDataServer = this.common;
        const ceDataServer = this.ce
        const tdmDataServer = this.tdm;
        const dataFromServer = this.ayd;
        this.ccData = [
          { name: 'Compromiso con la organización', value: +ccDataServer.cc1 },
          { name: 'Trabajo en Equipo', value: +ccDataServer.cc2 },
          { name: 'Adaptación al Cambio', value: +ccDataServer.cc3 },
          { name: 'Aprendizaje Continuo', value: +ccDataServer.cc4 },
          { name: 'Orientación al Resultado', value: +ccDataServer.cc5 },
          { name: 'Orientación al Usuario y al Ciudadano', value: +ccDataServer.cc6 },
        ];
        if (this.interviews.type === 'Test1' || this.interviews.type === 'Test3') {
          this.ceData = [
            { name: 'Gestión del Desarrollo de Personas', value: +ceDataServer.ce1 },
            { name: 'Pensamiento Sistémico', value: +ceDataServer.ce2 },
            { name: 'Resolución de Conflictos', value: +ceDataServer.ce3 },
            { name: 'Construcción de Relaciones', value: +ceDataServer.ce4 },
            { name: 'Conocimiento del Entorno', value: +ceDataServer.ce5 },
            { name: 'Colaboración', value: +ceDataServer.ce6 },
            { name: 'Manejo de la Información', value: +ceDataServer.ce7 },
          ];
        } else {
          this.ceData = [
            { name: 'Gestión del Desarrollo de Personas', value: +ceDataServer.ce1 },
            { name: 'Pensamiento Sistémico', value: +ceDataServer.ce2 },
            { name: 'Resolución de Conflictos', value: +ceDataServer.ce3 },
            { name: 'Construcción de Relaciones', value: +ceDataServer.ce4 },
            { name: 'Conocimiento del Entorno', value: +ceDataServer.ce5 },
            { name: 'Colaboración', value: +ceDataServer.ce6 },
            { name: 'Manejo de la Información', value: +ceDataServer.ce7 },
            { name: 'Relaciones Interpersonales', value: +ceDataServer.ce8 },
          ];
        }
        this.tdmData = [
          { name: 'Respuesta/. 1', value: +tdmDataServer.tm1 },
          { name: 'Respuesta/. 2', value: +tdmDataServer.tm2 },
          { name: 'Respuesta/. 3', value: +tdmDataServer.tm3 },
          { name: 'Respuesta/. 4', value: +tdmDataServer.tm4 },
          { name: 'Respuesta/. 5', value: +tdmDataServer.tm5 },
          { name: 'Respuesta/. 6', value: +tdmDataServer.tm6 },
          { name: 'Respuesta/. 7', value: +tdmDataServer.tm7 },
          { name: 'Respuesta/. 8', value: +tdmDataServer.tm8 },
        ];
        this.formattedData = [
          { name: 'Ansiedad', value: +dataFromServer.ayd1 },
          { name: 'Ansiedad', value: +dataFromServer.ayd2 },
          { name: 'Depresión', value: +dataFromServer.ayd3 },
          { name: 'Depresión', value: +dataFromServer.ayd4 }
        ];
        this.common = this.ccData;
        this.ce = this.ceData;
        this.tdm = this.tdmData;
        this.ayd = this.formattedData;

        if (this.ccResult >= 1 && this.ccResult <= 1.99 || this.ceResult >= 1 && this.ceResult <= 1.99) {
          this.ccStringResult = 'Baja';
        } if (this.ccResult >= 2 && this.ccResult <= 2.99 || this.ceResult >= 2 && this.ceResult <= 2.99) {
          this.ccStringResult = 'Moderada';
        } if (this.ccResult >= 3 && this.ccResult <= 4 || this.ceResult >= 3 && this.ceResult <= 4) {
          this.ccStringResult = 'Alta';
        } else {
          this.ccStringResult = 'Alta'
        }

        if (this.tdmResult >= 0 && this.tdmResult <= 6) {
          this.tdmStringResult = 'Escasa';
        } if (this.tdmResult >= 7 && this.tdmResult <= 15) {
          this.tdmStringResult = 'Moderada';
        } if (this.tdmStringResult >= 16 && this.tdmResult <= 25) {
          this.tdmStringResult = 'Elevada';
        } else {
          this.tdmStringResult = 'Superior';
        }

        if (this.aydResult >= 1 && this.aydResult <= 1.99) {
          this.aydStringResult = 'Alta';
        } if (this.aydResult >= 2 && this.aydResult <= 2.99) {
          this.aydStringResult = 'Moderada';
        } else {
          this.aydStringResult = 'Baja';
        }
      },
      error: (error) => {
        // this.alertService.error('¡Error!', error.error.message)
      }
    })
  }

  getResultParagraph(): string {
    if (this.ccStringResult === 'Baja') {
      return 'Se sugiere un seguimiento continuo y se establece un plan de fortalecimiento integral.';
    } else if (this.ccStringResult === 'Moderada') {
      return 'Se inicia un plan de fortalecimiento enfocado en áreas específicas de mejora';
    } else {
      return 'Reconocen y destacan significativamente, proporcionando retroalimentación positiva';
    }
  }

  getMesquite(): any {
    if (this.tdmStringResult === 'Superior') {
      return 'Realmente has alcanzado el top de la inteligencia emocional. Tal vez seas un niño sencillo con una gran comprensión de lo que ocurre en tu entorno. Esto puede llevarte a ser muy sensible en ciertas ocasiones pero tú sabes cómo responder ante esto. Eres una perla para tus compañeros y entorno así que valora lo que eres y recuerda siempre que con humildad se consigue más que por la fuerza. Enseña con el ejemplo aquello que ya eres naturalmente.';
    } else if (this.tdmStringResult === 'Elevada') {
      return 'Si has alcanzado esta puntuación ¡enhorabuena! Eres una persona con cierto nivel o grado de inteligencia emocional. Sabes reconocer cuándo otras personas están tristes. Puedes leer el lenguaje corporal y actuar en consecuencia de cada situación. Recuerda que lo que tienes es una herramienta muy valorable. Enseña a otros sobre la inteligencia emocional y nunca dejes de sentir empatía por tu entorno.';
    } else if (this.tdmStringResult === 'Moderada') {
      return 'Ya sabes lo que es la inteligencia emocional y en parte la llevas a la práctica. Sin embargo, ¡puedes mejorar! Debes saber que el conocimiento de otros nos hace más ricos internamente y nos fortalece. Además las personas valorarán el esfuerzo ¡No te rindas y sigue adelante!';
    } else {
      return 'Tienes poca inteligencia emocional lo que significa que debes desarrollar la misma mediante ejercicios y juegos. Ten en cuenta que todo se aprende y no te sientas mal pero sí considera aprender sobre esta gran estrategia que te permitirá conocer más a quienes te rodean.'
    }
  }

  getBehavior(): string {
    if (this.aydStringResult === 'Baja') {
      return 'Rango normal.';
    } else if (this.aydStringResult === 'Moderada') {
      return 'Ligeramente.';
    } else {
      return 'Moderadamente.';
    }
  }

  back() {
    this.location.back();
  }







}










