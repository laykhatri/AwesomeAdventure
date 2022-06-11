import {
  Component,
  HostListener,
  AfterContentInit,
  ViewChild,
} from "@angular/core";
import { monsters } from "./_helper/monster.helper";
import { player } from "./_helper/player.helper";
import { tutorial } from "./_helper/tutorial.helper";
import { MonsterPageComponent } from "./monster-page/monster-page.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterContentInit {
  // https://www.flaticon.com/search?word=monster

  @ViewChild(MonsterPageComponent) monster: any;

  title = "Awesome Adventure";

  TUTORIAL!: tutorial;
  MONSTERS!: monsters;
  PLAYER!: player;

  isCurrentMonsterDead: boolean = true;
  currentMonster: string = "";
  lastMonster: string = "";

  nextPowerUpgrade: number = 10;

  constructor() {
    if (localStorage.getItem("tutorial") != null) {
      this.TUTORIAL = JSON.parse(localStorage.getItem("tutorial")!);
    } else {
      this.TUTORIAL = new tutorial();
    }

    if (localStorage.getItem("player") != null) {
      this.PLAYER = JSON.parse(localStorage.getItem("player")!);
      this.populatePlayerProgress();
    } else {
      this.PLAYER = new player();
    }
  }
  ngAfterContentInit(): void {
    this.MONSTERS = new monsters();
    if (
      this.TUTORIAL.isTutorialDone &&
      localStorage.getItem("player") == null
    ) {
      this.PLAYER = new player();
    }
  }

  @HostListener("window:keyup", ["$event"])
  onKeyUp(event: KeyboardEvent) {
    if (this.TUTORIAL.isTutorialDone) {
      if (event.key == "H" || event.key == "h") {
        this.monster.attack();
      } else if (event.key == "U" || event.key == "u") {
        this.powerUpgrade();
      }
    }
  }

  populatePlayerProgress() {
    for (let i = 1; i < this.PLAYER.powerLevel; i++) {
      this.nextPowerUpgrade += this.getnextPowerUpgrade() * 0.8;
    }
  }

  pageChanged(page: number) {
    this.TUTORIAL.page = page;
  }

  EndOfTutorial() {
    this.TUTORIAL.isTutorialDone = true;

    localStorage.setItem("tutorial", JSON.stringify(this.TUTORIAL));
  }

  getRandomMonster() {
    if (this.isCurrentMonsterDead) {
      this.isCurrentMonsterDead = false;
      this.lastMonster = this.currentMonster;
      while (this.currentMonster == this.lastMonster) {
        this.currentMonster = this.MONSTERS.getRandomMonster();
      }
    }
    return this.currentMonster;
  }

  getCurrentLevel() {
    return this.PLAYER.monsterLevel;
  }
  getCurrentMonsterHealth() {
    let monsterHealth = 10;
    for (let i = 0; i < this.getCurrentLevel(); i++) {
      monsterHealth += monsterHealth * 0.5;
    }
    return monsterHealth;
  }

  getPlayerPower() {
    return this.PLAYER.power;
  }

  monsterDead() {
    this.isCurrentMonsterDead = true;
    this.PLAYER.monsterLevel++;
    this.PLAYER.coins += this.getCurrentMonsterHealth() * 0.1;
    this.saveProgress();
  }

  getCurrentCoins() {
    return this.PLAYER.coins;
  }

  getnextPowerUpgrade() {
    return this.nextPowerUpgrade;
  }

  saveProgress() {
    localStorage.setItem("player", JSON.stringify(this.PLAYER));
  }

  powerUpgrade() {
    if (this.PLAYER.coins >= this.nextPowerUpgrade) {
      this.PLAYER.coins -= this.nextPowerUpgrade;
      this.PLAYER.power += this.getPlayerPower() * 0.2;
      this.nextPowerUpgrade += this.getnextPowerUpgrade() * 0.8;
      this.PLAYER.powerLevel++;
      this.saveProgress();
    }
  }
}
