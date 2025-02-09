import { effect, inject, Injectable, signal } from "@angular/core";

import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "@angular/fire/auth";

import { catchError, from, map, mergeMap, Observable, of } from "rxjs";

import { UserState } from "./auth.interface";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authFirebase = inject(Auth);
  private userService = inject(UserService);

  userState = signal<UserState>(this.loadUserState());

  constructor() {
    effect(() => {
      localStorage.setItem("userState", JSON.stringify(this.userState()));
    });
  }

  private loadUserState(): UserState {
    const userState = localStorage.getItem("userState");
    return userState
      ? JSON.parse(userState)
      : { success: false, data: null, error: null };
  }

  createUser(email: string, password: string): Observable<UserState> {
    return from(
      createUserWithEmailAndPassword(this.authFirebase, email, password)
    ).pipe(
      mergeMap(async (userCredential) => {
        this.userState.set({
          success: true,
          data: userCredential.user,
          error: null,
        });
        await this.userService.saveUser(userCredential);
        return { success: true, data: userCredential.user, error: null };
      }),
      catchError((error) => {
        const errorMessage = this.getErrorMessageRegister(error.code);
        this.userState.set({ success: false, data: null, error: errorMessage });
        return of({ success: false, data: null, error: errorMessage });
      })
    );
  }

  loginUser(email: string, password: string): Observable<UserState> {
    return from(
      signInWithEmailAndPassword(this.authFirebase, email, password)
    ).pipe(
      map((userCredential) => {
        this.userState.set({
          success: true,
          data: userCredential.user,
          error: null,
        });
        return { success: true, data: userCredential.user, error: null };
      }),
      catchError((error) => {
        const errorMessage = this.getErrorMessageLogin(error.code);
        this.userState.set({ success: false, data: null, error: errorMessage });
        return of({ success: false, data: null, error: errorMessage });
      })
    );
  }

  logOutUser(): Observable<UserState> {
    return from(signOut(this.authFirebase)).pipe(
      map(() => {
        this.userState.set({
          success: true,
          data: null,
          error: null,
        });
        return { success: true, data: null, error: null };
      })
    );
  }

  resetPassword(email: string): Observable<any> {
    return from(sendPasswordResetEmail(this.authFirebase, email)).pipe(
      map(() => {
        this.userState.set({ success: true, data: null, error: null });
        return { success: true, data: null, error: null };
      })
    );
    // TODO: Obtain code from user and execute this fn.
    // await confirmPasswordReset("user@example.com", code);
  }

  private getErrorMessageRegister(errorCode: string): string {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/invalid-email":
        return "The email address is invalid.";
      case "auth/weak-password":
        return "The password is too weak.";
      default:
        return "Ha habido un problema. Por favor intenta otra vez.";
    }
  }

  private getErrorMessageLogin(errorMessage: string): string {
    switch (errorMessage) {
      case "MISSING_PASSWORD":
        return "El correo o la contraseña son incorrectos.";
      default:
        return "Ha habido un problema. Por favor intenta otra vez";
    }
  }
}
