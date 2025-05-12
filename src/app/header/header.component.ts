import { Component, inject, signal } from "@angular/core";

import {
  faUser,
  faDollarSign,
  faCreditCard,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ModalService } from "../shared/modal/modal.service";

@Component({
  selector: "or-header",
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: "./header.component.html",
  styles: [
    `
      :host {
        background-color: red;
      }
    `,
  ],
})
export class HeaderComponent {
  isPopoverOpen = signal(false);

  private modalService = inject(ModalService);

  faUser = faUser;
  faPlus = faPlus;
  faDollarSign = faDollarSign;
  faCreditCard = faCreditCard;

  togglePopover() {
    this.isPopoverOpen.set(true);
  }

  addTransaction() {
    this.isPopoverOpen.set(false);
    // this.modalService.openNewTransaction();
  }

  payTransaction() {
    this.isPopoverOpen.set(false);
    this.modalService.openPayTransaction();
  }
}
