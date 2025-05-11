import { Component } from "@angular/core";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MonthPickerComponent } from "./month-picker/month-picker.component";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "or-header-new",
  standalone: true,
  imports: [FontAwesomeModule, MonthPickerComponent, ReactiveFormsModule],
  templateUrl: "./header.component.html",
  styles: [
    `
      .header-container {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
      }
    `,
  ],
})
export class HeaderNewComponent {}
