import { Component, HostListener, AfterContentInit } from "@angular/core";
import { monsters } from "./_helper/monster.helper";
import { player } from "./_helper/player.helper";
import { tutorial } from "./_helper/tutorial.helper";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterContentInit {
  // https://www.flaticon.com/search?word=monster

  title = "Awesome Adventure";

  TUTORIAL!: tutorial;
  MONSTERS!: monsters;
  PLAYER!: player
  isCurrentMonsterDead: boolean= true;
  currentMonster:string = "";


  constructor() {
    if (localStorage.getItem("tutorial") != null) {
      this.TUTORIAL = JSON.parse(localStorage.getItem("tutorial")!);
    } else {
      this.TUTORIAL = new tutorial();
    }
  }
  ngAfterContentInit(): void {
    if(this.TUTORIAL.isTutorialDone){
      this.MONSTERS = new monsters();
      this.PLAYER = new player();
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

  getRandomMonster(){
    if(this.isCurrentMonsterDead)
    {
      this.isCurrentMonsterDead = false;
      this.currentMonster = this.MONSTERS.getRandomMonster();
    }
    return this.currentMonster;
  }

  getCurrentLevel()
  {
    return this.PLAYER.monsterLevel;
  }
  getCurrentMonsterHealth()
  {
    let monsterHealth = 10;
    for(let i = 0; i < this.getCurrentLevel(); i++)
    {
      monsterHealth += monsterHealth* 0.5;
    }
    return monsterHealth;
  }

  monsterDead()
  {
    this.isCurrentMonsterDead = true;
    this.PLAYER.monsterLevel++;
  }
}
