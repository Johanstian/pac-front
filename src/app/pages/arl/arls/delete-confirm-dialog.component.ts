import { Component, Inject } from '@angular/core';
import { NB_DIALOG_CONFIG, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-delete-confirm-dialog',
  template: `
    <nb-card>
      <nb-card-header>
        <h5>Confirmar Eliminación</h5>
      </nb-card-header>
      <nb-card-body>
        <p>{{ message }}</p>
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="confirm()" style="margin-right: 1rem;">
          Eliminar
        </button>
        <button nbButton status="basic" (click)="cancel()">
          Cancelar
        </button>
      </nb-card-footer>
    </nb-card>
  `
})
export class DeleteConfirmDialogComponent {
  message: string = '';

  constructor(
    protected dialogRef: NbDialogRef<DeleteConfirmDialogComponent>,
    @Inject(NB_DIALOG_CONFIG) protected config: any
  ) {
    if (this.config?.context?.message) {
      this.message = this.config.context.message;
    }
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}

