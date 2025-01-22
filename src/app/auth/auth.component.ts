import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "tpl-auth",
  imports: [FormsModule],
  templateUrl: "./auth.component.html",
  standalone: true,
})
export class AuthComponent implements OnInit {
  isSignUp = signal(false);
  error = signal("");

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.isSignUp.set(data["isSignUp"]);
    });
  }

  createUser(form: NgForm) {
    const { email, password } = form.value;
    this.authService.createUser(email, password).subscribe((response) => {
      if (response.success) {
        this.router.navigate(["/dashboard"]);
      } else {
        this.error.set(response.error);
      }
    });
  }

  loginUser(form: NgForm) {
    const { email, password } = form.value;
    this.authService.loginUser(email, password).subscribe((response) => {
      console.log(response);
    });
  }

  toggleSignUp() {
    const targetRoute = this.isSignUp.asReadonly() ? "/login" : "/sign-up";
    this.router.navigate([targetRoute]);
  }
}
