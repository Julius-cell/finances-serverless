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

  openNewTransaction(): void {
    this.modalDataSubject.next({
      type: ModalType.NEW_TRANSACTION,
      title: 'New Transaction',
      description: 'Enter the details of the new transaction.',
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