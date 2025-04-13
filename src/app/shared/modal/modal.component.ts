import { Component, inject } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "./modal.service";
import { AsyncPipe } from '@angular/common';
import { ModalType } from './modal.types';

@Component({
  selector: "app-modal",
  imports: [FontAwesomeModule, AsyncPipe],
  templateUrl: "./modal.component.html",
  styles: `
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: #fff;
      max-width: 500px;
      width: 80%;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
})
export class ModalComponent {
  private modalService = inject(ModalService);
  
  isOpen$ = this.modalService.isOpen$;
  modalData$ = this.modalService.modalData$;
  ModalType = ModalType;

  faClose = faClose;

  onClose(): void {
    this.modalService.close();
  }
}
