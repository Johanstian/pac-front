import { Component } from '@angular/core';
import { EnlistmentService } from 'src/app/core/services/enlistment.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent {

  value: any = '';
  loading: boolean = false;
  global: any;

  constructor(private enlistmentService: EnlistmentService) {

  }

  searching() {
    this.enlistmentService.getEnlistmentById(this.value).subscribe({
      next: (data) => {
        this.loading = true;
        this.global = data;
      }
    })
  }

  reset() {
    this.value = null;
    this.loading = false;
  }

}
