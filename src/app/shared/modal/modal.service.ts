import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalData, ModalType } from './modal.types';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isModalOpenSubject = new BehaviorSubject<boolean>(false);
  private modalDataSubject = new BehaviorSubject<ModalData | null>(null);

  isOpen$ = this.isModalOpenSubject.asObservable();
  modalData$ = this.modalDataSubject.asObservable();

  openNewIncome(): void {
    this.modalDataSubject.next({
      type: ModalType.INCOME,
      title: 'New Income',
      description: 'Enter the details of the new Income.',
    });
    this.isModalOpenSubject.next(true);
  }

  openNewExpense(): void {
    this.modalDataSubject.next({
      type: ModalType.EXPENSE,
      title: 'New Expense',
      description: 'Enter the details of the new Expense.',
    });
    this.isModalOpenSubject.next(true);
  }

  openPayTransaction(): void {
    this.modalDataSubject.next({
      type: ModalType.PAY_TRANSACTION,
      title: 'Pay Transaction',
      description: 'Choose a pending transaction from the list below to process the payment.',
    });
    this.isModalOpenSubject.next(true);
  }

  close(): void {
    this.isModalOpenSubject.next(false);
    this.modalDataSubject.next(null);
  }
} 