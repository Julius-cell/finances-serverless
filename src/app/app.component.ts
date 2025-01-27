import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: [],
})
export class AppComponent {
  title = "finances-serverless";

  constructor(private auth: AuthService) {
    this.auth.userState();
  }
}
