import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {

  test2Form!: FormGroup;

  constructor(private alertService: AlertService, private formBuilder: FormBuilder, private router: Router, private testService: TestService) {

  }

  ngOnInit(): void {
    this.form();
  }

  form() {
    this.test2Form = this.formBuilder.group({
      cc: ['', Validators.required],
      names: ['', Validators.required],
      academicTitle: ['', Validators.required],
      complement: ['', Validators.required],
      experienceWork: ['', Validators.required],
      cc1: [, Validators.required],
      cc2: [, Validators.required],
      cc3: [, Validators.required],
      cc4: [, Validators.required],
      cc5: [, Validators.required],
      cc6: [, Validators.required],
      ce1: [, Validators.required],
      ce2: [, Validators.required],
      ce3: [, Validators.required],
      ce4: [, Validators.required],
      ce5: [, Validators.required],
      ce6: [, Validators.required],
      ce7: [, Validators.required],
      ce8: [, Validators.required],
      tm1: [, Validators.required],
      tm2: [, Validators.required],
      tm3: [, Validators.required],
      tm4: [, Validators.required],
      tm5: [, Validators.required],
      tm6: [, Validators.required],
      tm7: [, Validators.required],
      tm8: [, Validators.required],
      ayd1: [, Validators.required],
      ayd2: [, Validators.required],
      ayd3: [, Validators.required],
      ayd4: [, Validators.required],
      type: ['Test2', Validators.required]
    })
  }

  save() {
    this.testService.createTest(this.test2Form.value).subscribe({
      next: () => {
        this.test2Form.reset();
        this.alertService.success('¡Correcto!', 'Test completado.');
        this.router.navigate(['/pages/home'])
      },
      error: (error) => {
        this.alertService.error('¡Error!', error.error.message)
        alert('NO NADA')
      }
    })
  }


}
