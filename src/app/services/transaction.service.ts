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

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private firestore = inject(Firestore);
  private userId = inject(AuthService).userState().data?.uid;

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
      `users/${this.userId}/finances/${yearMonth}/${subcollection}/${transactionId}`
    );

    return await setDoc(transactionRef, {
      ...transaction,
      status: transaction.status || TransactionStatus.Pending,
      userId: this.userId,
      createdAt: transactionDate,
    });
  }

  async getExpenses(): Promise<Transaction[]> {
    const userId = this.userId;
    const yearMonth = `${new Date().getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}`;

    const expensesCollection = collection(
      this.firestore,
      `users/${userId}/finances/${yearMonth}/expenses`
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
        date: yearMonth,
      };
    });

    return expenses;
  }
}
