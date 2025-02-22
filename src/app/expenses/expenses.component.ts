import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { faList } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "or-expenses",
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: "./expenses.component.html",
  styles: ``,
})
export class ExpensesComponent {
  faList = faList;

  sampleTransactions = [
    {
      id: 1,
      description: "Groceries",
      category: "Food",
      amount: 50,
      date: "2025-02-10",
      status: "paid",
    },
    {
      id: 2,
      description: "Internet Bill",
      category: "Utilities",
      amount: 30,
      date: "2025-02-12",
      status: "pending",
    },
    {
      id: 3,
      description: "Gym Membership",
      category: "Health",
      amount: 40,
      date: "2025-02-15",
      status: "paid",
    },
  ];
}
