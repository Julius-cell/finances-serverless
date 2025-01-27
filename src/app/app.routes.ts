import { Routes } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: AuthComponent },
  { path: "sign-up", component: AuthComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: "**", redirectTo: "login" },
];
