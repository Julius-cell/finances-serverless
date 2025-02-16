import { Component, signal } from "@angular/core";

import {
  faUser,
  faDollarSign,
  faCreditCard,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

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

  faUser = faUser;
  faPlus = faPlus;
  faDollarSign = faDollarSign;
  faCreditCard = faCreditCard;

  togglePopover() {
    this.isPopoverOpen.set(!this.isPopoverOpen());
  }

  addTransaction() {
    console.log("Add transaction clicked");
  }

  payTransaction() {
    console.log("Pay transaction clicked");
  }
}
