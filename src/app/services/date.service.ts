import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DateService {
  private date = new BehaviorSubject<string>("");
  date$ = this.date.asObservable();

  constructor() {
    this.initializeDate();
  }

  private initializeDate(): void {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    this.date.next(`${month}-${year}`);
  }

  setMonth(month: number): void {
    const date = new Date();
    const year = date.getFullYear();
    const monthString = month.toString().padStart(2, "0");
    this.date.next(`${monthString}-${year}`);
  }
}
