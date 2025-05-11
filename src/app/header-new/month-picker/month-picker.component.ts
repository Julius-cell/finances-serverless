import {
  Component,
  computed,
  ElementRef,
  HostListener,
  signal,
  ViewChild,
} from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export interface MonthYear {
  month: number;
  year?: number;
}

@Component({
  selector: "app-month-picker",
  templateUrl: "./month-picker.component.html",
  standalone: true,
  imports: [FontAwesomeModule],
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

  isSelectorOpen = signal(false);
  month = signal<string | undefined>(undefined);

  monthYear = computed(() => {
    const date = new Date();
    const year = date.getFullYear();
    return `${this.month()}/${year}`;
  });

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

  constructor() {
    this.setMonth();
  }

  toggleSelector() {
    this.isSelectorOpen.set(!this.isSelectorOpen());
  }

  setMonth(month?: number): void {
    if (month) {
      this.month.set(month.toString().padStart(2, "0"));
      this.isSelectorOpen.set(false);
      return;
    }
    const date = new Date();
    const actualMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    this.month.set(actualMonth);
    this.isSelectorOpen.set(false);
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
