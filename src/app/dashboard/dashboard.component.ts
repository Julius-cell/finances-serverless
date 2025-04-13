import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../auth/auth.service";

import { HeaderComponent } from "../header/header.component";
import { ResumeComponent } from "../resume/resume.component";
import { BudgetComponent } from "../budget/budget.component";
import { ExpensesComponent } from "../expenses/expenses.component";
import { ModalComponent } from "../shared/modal/modal.component";
@Component({
  selector: "tpl-dashboard",
  standalone: true,
  imports: [
    HeaderComponent,
    ResumeComponent,
    BudgetComponent,
    ExpensesComponent,
    ModalComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styles: [``],
})
export class DashboardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {}

  logout() {
    this.authService.logOutUser().subscribe((response) => {
      if (response.success) {
        this.router.navigate(["/login"]);
      }
    });
  }
}
