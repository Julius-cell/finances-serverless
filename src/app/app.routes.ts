import { Routes } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";


export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: AuthComponent, data: { isSignUp: false } },
  { path: "sign-up", component: AuthComponent, data: { isSignUp: true } },
  // Add a fallback route
  { path: "**", redirectTo: "login" },
];
