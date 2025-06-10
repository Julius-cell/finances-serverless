import { Component, inject } from "@angular/core";
import { ModalService } from "../shared/modal/modal.service";
import { TransactionService } from "../services/transaction.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "or-expenses-new",
  imports: [AsyncPipe],
  templateUrl: "./expenses-new.component.html",
  styles: ``,
})
export class ExpensesNewComponent {
  private modalService = inject(ModalService);
  expenses = inject(TransactionService).getExpenses();

  addExpense() {
    this.modalService.openNewExpense();
  }
}
