import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { IdentityService } from 'src/app/core/services/identity.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  signInForm!: FormGroup;
  username: any;
  password: any;
  user: any;
  roles: any;

  showPassword = false;


  socialLinks: any

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }




  initForm() {
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  signIn() {
    this.identityService.login(this.signInForm.value).subscribe({
      next: (data) => {
        this.user = data;
        localStorage.setItem('token', 'true');
        localStorage.setItem('roles', JSON.stringify(this.user.role));
        this.router.navigate(['/pages/home']);
        this.roles = this.identityService.getUser().role;
        this.identityService.saveUser(this.user);
        this.alertService.success('Inicio de sesión correcto', 'OK');

      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    })
  }

  login() {
    this.identityService.login(this.signInForm.value).subscribe({
      next: (data) => {
        this.user = data;
        localStorage.setItem('token', 'true');
        localStorage.setItem('roles', JSON.stringify(this.user.role));
        this.router.navigate(['/pages/home']);
        this.roles = this.identityService.getUser().role;
        this.identityService.saveUser(this.user);
        this.alertService.success('Inicio de sesión correcto', 'OK');

      },
      error: (err) => {
        this.alertService.error('¡Error!', err.error.message);
      }
    })
  }

  getConfigValue(key: string): any {

  }


}