import { Component, HostListener } from "@angular/core";
import { tutorial } from "./_helper/tutorial.helper";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Awesome Adventure";

  TUTORIAL!: tutorial;

  constructor() {
    if (localStorage.getItem("tutorial") != null) {
      this.TUTORIAL = JSON.parse(localStorage.getItem("tutorial")!);
    } else {
      this.TUTORIAL = new tutorial();
    }
  }

  @HostListener("window:keyup", ["$event"])
  onKeyUp(event: KeyboardEvent) {}

  pageChanged(page: number) {
    this.TUTORIAL.page = page;
  }

  EndOfTutorial() {
    this.TUTORIAL.isTutorialDone = true;

    localStorage.setItem("tutorial", JSON.stringify(this.TUTORIAL));
  }
}
