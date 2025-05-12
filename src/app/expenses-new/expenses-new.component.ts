import { Component, inject } from "@angular/core";
import { ModalService } from "../shared/modal/modal.service";

@Component({
  selector: "or-expenses-new",
  imports: [],
  templateUrl: "./expenses-new.component.html",
  styles: ``,
})
export class ExpensesNewComponent {
  private modalService = inject(ModalService);

  expenses = [
    {
      id: 1,
      name: "Expense 1",
      amount: 100,
      status: "Pending",
      category: "Food",
    },
    {
      id: 2,
      name: "Expense 2",
      amount: 200,
      status: "Pending",
      category: "Transport",
    },
    {
      id: 3,
      name: "Expense 3",
      amount: 300,
      status: "Pending",
      category: "Entertainment",
    },
  ];

  addExpense() {
    this.modalService.openNewExpense();
  }
}
