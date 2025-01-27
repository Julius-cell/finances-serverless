import { Component, inject, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "tpl-auth",
  imports: [FormsModule],
  templateUrl: "./auth.component.html",
  standalone: true,
})
export class AuthComponent implements OnInit {
  isSignUp = signal(true);
  error = signal("");

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  ngOnInit() {}

  createUser(form: NgForm) {
    const { email, password } = form.value;
    this.authService.createUser(email, password).subscribe((response) => {
      if (response.success) {
        this.router.navigate(["/dashboard"]);
      } else {
        this.error.set(response.error!);
      }
    });
  }

  loginUser(form: NgForm) {
    const { email, password } = form.value;
    this.authService.loginUser(email, password).subscribe((response) => {
      if (response.success) {
        this.router.navigate(["/dashboard"]);
      } else {
        this.error.set(response.error!);
      }
    });
  }

  navigateTo(route: "login" | "sign-up") {
    this.isSignUp.set(route === "sign-up");
    const targetRoute = "/" + route;
    this.router.navigate([targetRoute]);
  }
}
