import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "tpl-auth",
  imports: [],
  templateUrl: "./auth.component.html",
  standalone: true,
})
export class AuthComponent implements OnInit {
  isSignUp = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.isSignUp = data["isSignUp"];
    });
  }

  toggleSignUp() {
    const targetRoute = this.isSignUp ? "/login" : "/sign-up";
    this.router.navigate([targetRoute]);
  }
}
