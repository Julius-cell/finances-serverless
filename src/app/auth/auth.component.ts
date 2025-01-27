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
  isRecoveryPass = signal(false);
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

  recoverPassword(form: NgForm) {
    const { email } = form.value;
    this.authService.resetPassword(email).subscribe(() => {
      this.isRecoveryPass.set(false);
    });
  }

  navigateTo(route: "login" | "sign-up" | "forgot-password") {
    switch (route) {
      case "login":
        this.isRecoveryPass.set(false);
        this.isSignUp.set(false);
        break;
      case "sign-up":
        this.isSignUp.set(true);
        break;
      case "forgot-password":
        this.isRecoveryPass.set(true);
        break;
    }
  }
}
