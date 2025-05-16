import { inject, Injectable } from "@angular/core";
import {
  collection,
  doc,
  Firestore,
  getDocs,
  setDoc,
} from "@angular/fire/firestore";
import {
  Transaction,
  TransactionStatus,
} from "../shared/modal/transaction-form/transaction-form.component";
import { AuthService } from "../auth/auth.service";
import { DateService } from "./date.service";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private firestore = inject(Firestore);
  private userId = inject(AuthService).userState().data?.uid;
  private date = inject(DateService).getDate();

  async saveIncome(transaction: Transaction): Promise<void> {
    const transactionDate = new Date();
    const transactionId = `${transactionDate.getTime()}`;

    const transactionRef = doc(
      this.firestore,
      `users/${this.userId}/finances/${this.date}/incomes/${transactionId}`
    );

    return await setDoc(transactionRef, {
      ...transaction,
      userId: this.userId,
      createdAt: transactionDate,
    });
  }

  async saveExpense(transaction: Transaction): Promise<void> {
    const transactionDate = new Date();
    const transactionId = `${transactionDate.getTime()}`;

    const transactionRef = doc(
      this.firestore,
      `users/${this.userId}/finances/${this.date}/expenses/${transactionId}`
    );

    return await setDoc(transactionRef, {
      ...transaction,
      status: TransactionStatus.Pending,
      userId: this.userId,
      createdAt: transactionDate,
    });
  }

  async getExpenses(): Promise<Transaction[]> {
    const expensesCollection = collection(
      this.firestore,
      `users/${this.userId}/finances/${this.date}/expenses`
    );

    const expensesSnapshot = await getDocs(expensesCollection);
    const expenses = expensesSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        amount: doc.data()["amount"],
        category: doc.data()["category"],
        name: doc.data()["name"],
        type: doc.data()["type"],
        status: doc.data()["status"],
        date: this.date,
      };
    });

    return expenses;
  }
}
