import { Component } from "@angular/core";

import { faChartPie } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BaseChartDirective } from "ng2-charts";
import { ChartData } from "chart.js";

@Component({
  selector: "or-budget",
  standalone: true,
  imports: [FontAwesomeModule, BaseChartDirective],
  templateUrl: "./budget.component.html",
  styles: [``],
})
export class BudgetComponent {
  faChartPie = faChartPie;

  pieChartData: ChartData<"pie", number[], string> = {
    labels: ["Rent", "Food", "Entertainment", "Savings"],
    datasets: [
      {
        data: [500, 300, 200, 100],
      },
    ],
  };

  pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: true }, // Equivalent to <Tooltip />
    },
  };
}
