import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "tpl-dashboard",
  imports: [],
  templateUrl: "./dashboard.component.html",
  styles: ``,
})
export class DashboardComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  logout() {
    this.auth.logOutUser().subscribe((response) => {
      if (response.success) {
        this.router.navigate(["/login"]);
      }
    });
  }
}
