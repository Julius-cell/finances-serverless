import { Component } from "@angular/core";

import { faChartBar } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "or-resume",
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: "./resume.component.html",
  styles: ``,
})
export class ResumeComponent {
  faChartBar = faChartBar;
}
