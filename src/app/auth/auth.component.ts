import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";

import { AuthService } from "./auth.service";

import {
  faKey,
  faUserPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "tpl-auth",
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: "./auth.component.html",
  standalone: true,
})
export class AuthComponent {
  isLogin = signal(true);
  error = signal("");

  isRecoveryPass = signal(false);

  faKey = faKey;
  faUserPlus = faUserPlus;
  faSignInAlt = faSignInAlt;

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  handleSubmit(form: NgForm) {
    if (form.invalid) {
      this.error.set("Por favor, completa todos los campos.");
      return;
    }

    if (this.isLogin()) {
      this.loginUser(form);
      return;
    }
    this.createUser(form);
  }

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
    if (form.invalid) {
      this.error.set("Por favor, completa todos los campos.");
      return;
    }

    const { email } = form.value;
    this.authService.resetPassword(email).subscribe({
      next: (v) => this.isRecoveryPass.set(false),
    });
  }

  toggleAuthMode(): void {
    this.isLogin.set(!this.isLogin());
  }
}
