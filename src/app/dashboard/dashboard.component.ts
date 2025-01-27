import { Component, inject } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "tpl-dashboard",
  imports: [],
  template: `
    <div class="flex justify-between">
      <p>dashboard works!</p>
      <button (click)="logout()">Log out</button>
    </div>
  `,
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
