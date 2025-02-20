import { Component } from "@angular/core";

import { faChartPie } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "or-budget",
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: "./budget.component.html",
  styles: [``],
})
export class BudgetComponent {
  faChartPie = faChartPie
}
