import { Component, inject } from "@angular/core";
import { ModalService } from "../shared/modal/modal.service";

@Component({
  selector: "or-incomes",
  imports: [],
  templateUrl: "./incomes.component.html",
  styles: ``,
})
export class IncomesComponent {
  private modalService = inject(ModalService);

  incomes = [
    {
      id: 1,
      name: "Expense 1",
      amount: 100,
    },
  ];

  addIncome() {
    this.modalService.openNewIncome();
  }
}
