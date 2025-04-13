import { inject, Injectable } from '@angular/core';

import { UserCredential } from "@angular/fire/auth";
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private firestore = inject(Firestore);

  async addExpense(userCredential: UserCredential, expense: any): Promise<void> {
    const userRef = doc(this.firestore, `users/${userCredential.user.uid}/expenses`);
    return await setDoc(userRef, {
      ...expense,
      date: new Date(),
    });
  }

  async getExpenses(userCredential: UserCredential): Promise<any> {
    return collection(this.firestore, `users/${userCredential.user.uid}/expenses`);
  }
}
