import { Component } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private alertService: AlertService) {

  }

  show() {
    this.alertService.success('Probando', 'OK')
  }

}
