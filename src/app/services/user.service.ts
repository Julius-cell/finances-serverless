import { inject, Injectable } from "@angular/core";

import { doc, Firestore, setDoc } from "@angular/fire/firestore";

import { UserCredential } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private firestore = inject(Firestore);

  async saveUser(userCredential: UserCredential): Promise<void> {
    const userRef = doc(this.firestore, `users/${userCredential.user.uid}`);
    return await setDoc(userRef, {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      createdAt: new Date(),
    });
  }
}
