export enum ModalType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  PAY_TRANSACTION = "PAY_TRANSACTION",
}

export interface ModalData {
  type: ModalType;
  title: string;
  description: string;
}
