import {
  Component,
  HostListener,
  AfterContentInit,
  ViewChild,
} from "@angular/core";
import { monsters } from "./_helper/monster.helper";
import { player } from "./_helper/player.helper";
import { tutorial } from "./_helper/tutorial.helper";
import { playerstats } from "./_helper/playerstats.helper";
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
  PLAYERSTATS!: playerstats;

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
    if(localStorage.getItem("playerStats")!=null){
      this.PLAYERSTATS = JSON.parse(localStorage.getItem("playerStats")!);
    }
    else
    {
      this.PLAYERSTATS = new playerstats();
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

  @HostListener("window:keydown", ["$event"])
  onKeyUp(event: KeyboardEvent) {
    if (this.TUTORIAL.isTutorialDone) {
      if (event.key == "H" || event.key == "h") {
        this.monster.attack();

      } else if (event.key == "U" || event.key == "u") {
        this.powerUpgrade();
      }
      else if(event.key == "P" || event.key == "p"){
        if(this.getCurrentLevel() >= this.getNextPrestige(this.PLAYER.lastPrestige))
        {
          this.handlePrestrige(true);
        }
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
    this.PLAYERSTATS.lifetimeCoins += this.getCurrentMonsterHealth() * 0.1;
    this.PLAYERSTATS.lifetimeKills++;
    if(this.PLAYER.monsterLevel>this.PLAYERSTATS.maxMonsterLevel){
      this.PLAYERSTATS.maxMonsterLevel=this.PLAYER.monsterLevel;
    }
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
    localStorage.setItem("playerStats", JSON.stringify(this.PLAYERSTATS));
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

  getTopLevel(){
    return this.PLAYERSTATS.maxMonsterLevel;
  }

  getTotalKills(){
    return this.PLAYERSTATS.lifetimeKills;
  }

  getTotalCoins()
  {
    return this.PLAYERSTATS.lifetimeCoins;
  }

  getSuperCoin()
  {
    return this.PLAYER.superCoin;
  }

  getNextPrestige(lastPrestige:number)
  {
    if(lastPrestige%10)
    {
      return lastPrestige + (10-lastPrestige%10);
    }
    else
    {
      return lastPrestige + 10;
    }
  }

  getLastPrestige()
  {
    return this.PLAYER.lastPrestige;
  }

  handlePrestrige(trigger:boolean)
  {
    if(trigger)
    {
      const currrentLevel = this.getCurrentLevel();
      const superCoin = this.getSuperCoin()+1;
      this.PLAYER = new player();
      this.PLAYER.lastPrestige = currrentLevel;
      this.PLAYER.superCoin= superCoin;
      this.saveProgress();
      window.location.reload();
    }
  }

  resetEverything()
  {
    if(confirm("Are you sure you want to reset everything? This will delete all your progress and you will start from scratch."))
    {
      localStorage.clear();
      window.location.reload();
    }
  }
}
