import { Component, OnInit } from '@angular/core';
// import { ProgressBarService } from 'src/app/core/services/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {

  enabled: boolean = false;

  // constructor(private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    // this.progressBarService.enabled.subscribe((enabled: boolean)=> {
    //   this.enabled = enabled
    // })
  }

}
