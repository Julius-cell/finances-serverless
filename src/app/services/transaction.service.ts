import { inject, Injectable } from "@angular/core";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { Transaction } from "../shared/modal/transaction-form/transaction-form.component";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private firestore = inject(Firestore);
  private userCredential = inject(AuthService).userState();

  async saveTransaction(transaction: Transaction): Promise<void> {
    const transactionDate = new Date();
    const yearMonth = `${transactionDate.getFullYear()}-${String(
      transactionDate.getMonth() + 1
    ).padStart(2, "0")}`;

    const subcollection =
      transaction.type === "Income" ? "incomes" : "expenses";

    const transactionId = `${transactionDate.getTime()}`;

    const transactionRef = doc(
      this.firestore,
      `users/${this.userCredential.data?.uid}/finances/${yearMonth}/${subcollection}/${transactionId}`
    );

    return await setDoc(transactionRef, {
      ...transaction,
      userId: this.userCredential.data?.uid,
      createdAt: transactionDate,
    });
  }
}
