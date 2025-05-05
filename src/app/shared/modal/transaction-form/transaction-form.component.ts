import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../../services/transaction.service';
import { CategorySelectComponent } from './category-select/category-select.component';
import { Category } from '../../../services/category.service';

export type TransactionType = 'Expense' | 'Income';
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  name: string;
  category: string;
  date: string;
}

@Component({
  selector: 'transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CategorySelectComponent],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  form: FormGroup = this.fb.group({
    type: this.fb.control<TransactionType>('Expense', Validators.required),
    name: this.fb.control<Category | undefined>(undefined, Validators.required),
    category: this.fb.control<string>('', Validators.required),
    amount: this.fb.control<number>(0, [Validators.required, Validators.min(0)]),
  });

  onSubmit = output<Transaction>();
  onCancel = output<void>();

  async handleSubmit(): Promise<void> {
    if (this.form.valid) {
      await this.transactionService.saveTransaction(this.form.value);
      this.onSubmit.emit(this.form.value);
    }
  }

  handleSelectedCategory(category: Category): void {
    this.form.patchValue({ category });
  }
} 