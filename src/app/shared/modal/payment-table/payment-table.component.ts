import { Component, inject, output, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransactionService } from "../../../services/transaction.service";
import { Transaction } from "../transaction-form/transaction-form.component";

@Component({
  selector: "modal-payment-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./payment-table.component.html",
})
export class PaymentTableComponent {
  private transactionService = inject(TransactionService);

  transactions = signal<Transaction[]>([]);

  constructor() {
    this.transactionService.getExpenses().then((transactions) => {
      this.transactions().push(...transactions);
    });
  }

  onPay = output<Transaction>();
}
