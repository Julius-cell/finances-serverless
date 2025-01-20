import { Component, OnInit } from "@angular/core";
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
  isSignUp = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.isSignUp = data["isSignUp"];
    });
  }

  signUp(form: NgForm) {
    const { email, password } = form.value;
    this.authService.signUp(email, password);
  }

  toggleSignUp() {
    const targetRoute = this.isSignUp ? "/login" : "/sign-up";
    this.router.navigate([targetRoute]);
  }
}
