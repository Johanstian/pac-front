import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbIconConfig, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  positions = NbGlobalPhysicalPosition;
  duration: number = 8000;

  constructor(private nbToastrService: NbToastrService) {

  }

  success(title: string, message: string) {
    const duration = this.duration;
    const destroyByClick = true;
    const position = NbGlobalPhysicalPosition.TOP_RIGHT;
    const icon: NbIconConfig = {icon: 'checkmark-outline'};
    this.nbToastrService.primary(message, title, {duration, destroyByClick, position, icon})
  }

  error(title: string, message: string) {
    const duration = this.duration;
    const destroyByClick = true;
    const position = NbGlobalPhysicalPosition.TOP_RIGHT;
    const icon: NbIconConfig = {icon: 'close-outline'};
    this.nbToastrService.danger(message, title, {duration, destroyByClick, position, icon})
  }


}
