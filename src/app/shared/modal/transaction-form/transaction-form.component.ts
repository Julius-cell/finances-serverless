import { Component, inject, input, output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TransactionService } from "../../../services/transaction.service";
import { CategorySelectComponent } from "./category-select/category-select.component";
import { Category } from "../../../services/category.service";
import { ModalType } from "../modal.types";

export enum TransactionType {
  EXPENSE = "expense",
  INCOME = "income",
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  name: string;
  category: Category;
  date: string;
  status: TransactionStatus;
}

export enum TransactionStatus {
  Pending = "pending",
  Paid = "paid",
}

@Component({
  selector: "transaction-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CategorySelectComponent],
  templateUrl: "./transaction-form.component.html",
})
export class TransactionFormComponent {
  type = input.required<ModalType>();

  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  incomeForm: FormGroup = this.fb.group({
    name: this.fb.control<string>("", Validators.required),
    amount: this.fb.control<number>(0, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  expenseForm: FormGroup = this.fb.group({
    type: this.fb.control<TransactionType>(
      TransactionType.EXPENSE,
      Validators.required
    ),
    name: this.fb.control<string>("", Validators.required),
    category: this.fb.control<string>("", Validators.required),
    amount: this.fb.control<number>(0, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  onSubmit = output<Transaction>();
  onCancel = output<void>();

  ModalType = ModalType;

  async handleSubmitIncome(): Promise<void> {
    if (this.incomeForm.valid) {
      await this.transactionService.saveIncome(this.incomeForm.value);
      this.onSubmit.emit(this.incomeForm.value);
    }
  }

  async handleSubmitExpense(): Promise<void> {
    if (this.expenseForm.valid) {
      await this.transactionService.saveExpense(this.expenseForm.value);
      this.onSubmit.emit(this.expenseForm.value);
    }
  }

  handleSelectedCategory(category: Category): void {
    this.expenseForm.patchValue({ category });
  }
}
