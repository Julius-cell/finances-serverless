import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../../services/transaction.service';
import { CategorySelectComponent } from './category-select/category-select.component';
import { Category } from '../../../services/category.service';
import { ModalType } from '../modal.types';

export type TransactionType = 'expense' | 'income';
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  name: string;
  category: string;
  date: string;
  status: TransactionStatus;
}

export enum TransactionStatus {
  Pending = 'pending',
  Paid = 'paid',
}

@Component({
  selector: 'transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CategorySelectComponent],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent {
  type = input.required<ModalType>();

  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  form: FormGroup = this.fb.group({
    type: this.fb.control<TransactionType>('expense', Validators.required),
    name: this.fb.control<Category | undefined>(undefined, Validators.required),
    category: this.fb.control<string>('', Validators.required),
    amount: this.fb.control<number>(0, [Validators.required, Validators.min(0)]),
  });

  onSubmit = output<Transaction>();
  onCancel = output<void>();

  ModalType = ModalType;

  async handleSubmit(): Promise<void> {
    if (this.form.valid) {
      await this.transactionService.saveExpense(this.form.value);
      this.onSubmit.emit(this.form.value);
    }
  }

  handleSelectedCategory(category: Category): void {
    this.form.patchValue({ category });
  }
} 