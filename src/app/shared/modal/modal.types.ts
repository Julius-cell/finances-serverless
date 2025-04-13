export enum ModalType {
  NEW_TRANSACTION = "NEW_TRANSACTION",
  PAY_TRANSACTION = "PAY_TRANSACTION",
}

export interface ModalData {
  type: ModalType;
  title: string;
}
