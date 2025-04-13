import { Component, output, inject } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "./modal.service";
import { AsyncPipe } from '@angular/common';
import { ModalType } from './modal.types';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { PaymentTableComponent, PaymentTransaction } from './payment-table/payment-table.component';

@Component({
  selector: "app-modal",
  imports: [FontAwesomeModule, AsyncPipe, TransactionFormComponent, PaymentTableComponent],
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
      max-width: 800px;
      width: 90%;
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

  // Mock data for transactions to pay
  transactionsToPay: PaymentTransaction[] = [
    { id: '1', description: 'Rent', amount: 500000 },
    { id: '2', description: 'Electricity Bill', amount: 45000 },
    { id: '3', description: 'Internet', amount: 25000 },
  ];

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

  onPayTransaction(transaction: PaymentTransaction): void {
    console.log('Paying transaction:', transaction);
    this.onClose();
  }
}
