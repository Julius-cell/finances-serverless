import { User } from "@angular/fire/auth";

export interface UserState {
  success: boolean;
  data?: User | null;
  error?: string | null;
}
