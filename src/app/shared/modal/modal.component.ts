import { Component, output, inject } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "./modal.service";
import { AsyncPipe } from '@angular/common';
import { ModalType } from './modal.types';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

@Component({
  selector: "app-modal",
  imports: [FontAwesomeModule, AsyncPipe, TransactionFormComponent],
  templateUrl: "./modal.component.html",
  styles: `
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: #fff;
      max-width: 500px;
      width: 80%;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-description {
      color: #64748b;
    }
  `,
})
export class ModalComponent {
  private modalService = inject(ModalService);
  
  isOpen$ = this.modalService.isOpen$;
  modalData$ = this.modalService.modalData$;
  ModalType = ModalType;

  close = output();

  faClose = faClose;

  onClose(): void {
    this.modalService.close();
    this.close.emit();
  }

  onTransactionSubmit(data: any): void {
    console.log('Transaction submitted:', data);
    this.onClose();
  }
}
