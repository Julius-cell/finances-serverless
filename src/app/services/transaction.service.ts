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
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private firestore = inject(Firestore);
  private userId = inject(AuthService).userState().data?.uid;
  private date = inject(DateService).getDate();

  private expenses = new BehaviorSubject<Transaction[]>([]);
  expenses$ = this.expenses.asObservable();

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

    const newTransaction = {
      ...transaction,
      status: TransactionStatus.Pending,
      createdAt: transactionDate,
    };

    this.expenses.next([
      ...this.expenses.getValue(),
      {
        ...newTransaction,
        id: transactionId,
        date: this.date,
      },
    ])

    return await setDoc(transactionRef, {
      ...newTransaction,
      userId: this.userId,
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
