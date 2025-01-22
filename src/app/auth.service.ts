import { inject, Injectable, signal } from "@angular/core";

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import { catchError, from, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private auth = inject(Auth);

  isAuthenticated = signal(false);

  createUser(email: string, password: string): Observable<any> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      map((userCredential) => ({
        success: true,
        data: userCredential.user,
      })),
      catchError((error) => {
        const errorMessage = this.getErrorMessage(error.code);
        return from([{ success: false, error: errorMessage }]);
      })
    );
  }

  loginUser(email: string, password: string): Observable<any> {
    return from(
      signInWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      map((userCredential) => ({
        success: true,
        data: userCredential.user,
      })),
      catchError((error) => {
        const errorMessage = this.getErrorMessage(error.code);
        return from([{ success: false, error: errorMessage }]);
      })
    );
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/invalid-email":
        return "The email address is invalid.";
      case "auth/weak-password":
        return "The password is too weak.";
      default:
        return "An unknown error occurred. Please try again.";
    }
  }
}
