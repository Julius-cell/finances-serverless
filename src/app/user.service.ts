import { inject, Injectable } from "@angular/core";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private firestore = inject(Firestore);

  async saveUser(userCredential: any, email: string): Promise<void> {
    const userRef = doc(this.firestore, `users/${userCredential.user.uid}`);
    return await setDoc(userRef, {
      uid: userCredential.user.uid,
      email,
      createdAt: new Date(),
    });
  }
}
