import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PaymentTransaction {
  id: string;
  description: string;
  amount: number;
}

@Component({
  selector: 'modal-payment-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-table.component.html',
})
export class PaymentTableComponent {
  transactions = input.required<PaymentTransaction[]>();
  onPay = output<PaymentTransaction>();
} 