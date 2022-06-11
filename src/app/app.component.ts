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
    this.TUTORIAL = new tutorial();
  }

  @HostListener("window:keyup", ["$event"])
  onKeyUp(event: KeyboardEvent) {}
}
