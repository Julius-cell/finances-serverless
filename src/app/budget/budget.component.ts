import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

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
export class BudgetComponent implements OnInit {
  faChartPie = faChartPie;
  budgetItems: { name: string; amount: number; value: number }[] = [];

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

  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  ngOnInit() {
    this.getBudgetItems();
  }

  getBudgetItems(): void {
    this.budgetItems = this.pieChartData.labels!.map((label, index) => ({
      name: label,
      amount: this.pieChartData.datasets[0].data[index],
      value: this.calculatePercentage(index),
    }));
  }

  calculatePercentage(index: number): number {
    const total = this.pieChartData.datasets[0].data.reduce(
      (acc, val) => acc + val,
      0
    );
    return ((this.pieChartData.datasets[0].data[index] / total) * 100).toFixed(
      2
    ) as unknown as number;
  }
}
