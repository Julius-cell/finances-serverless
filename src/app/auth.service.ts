import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private auth = inject(Auth);

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor() {}

  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredentials) => {
        // console.log(userCredentials);
        this.isAuthenticated.next(true);
      })
      .catch((error) => console.error(error));
  }
}
