import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export type TransactionType = 'Expense' | 'Income';

@Component({
  selector: 'modal-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent {
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    type: ['Expense', Validators.required],
    amount: [null, [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
  });

  onSubmit = output<{
    type: TransactionType;
    amount: number;
    category: string;
  }>();

  onCancel = output<void>();

  handleSubmit(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
} 