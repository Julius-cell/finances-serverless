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
    });
    this.isModalOpenSubject.next(true);
  }

  openPayTransaction(): void {
    this.modalDataSubject.next({
      type: ModalType.PAY_TRANSACTION,
      title: 'Pay Transaction',
    });
    this.isModalOpenSubject.next(true);
  }

  close(): void {
    this.isModalOpenSubject.next(false);
    this.modalDataSubject.next(null);
  }
} 