import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { DateService } from "../../services/date.service";
import { AsyncPipe } from "@angular/common";


@Component({
  selector: "app-month-picker",
  templateUrl: "./month-picker.component.html",
  standalone: true,
  imports: [FontAwesomeModule, AsyncPipe],
  styles: [
    `
      :host {
        align-self: center;
      }

      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        position: absolute;
        background: white;
      }
    `,
  ],
})
export class MonthPickerComponent {
  @ViewChild("container") containerRef!: ElementRef;
  private dateService = inject(DateService);

  monthYear$ = this.dateService.date$;

  isSelectorOpen = signal(false);
  month = signal<string | undefined>(undefined);

  faAngleDown = faAngleDown;

  monthsLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  constructor() {}

  toggleSelector() {
    this.isSelectorOpen.set(!this.isSelectorOpen());
  }

  setMonth(month: number): void {
    this.dateService.setMonth(month);
  }

  @HostListener("document:click", ["$event.target"])
  onClickOutside(target: HTMLElement) {
    if (
      this.containerRef &&
      !this.containerRef.nativeElement.contains(target)
    ) {
      this.isSelectorOpen.set(false);
    }
  }
}
