import { Component, Input, OnInit, Output, EventEmitter , AfterContentChecked} from '@angular/core';

@Component({
  selector: 'app-monster-page',
  templateUrl: './monster-page.component.html',
  styleUrls: ['./monster-page.component.css']
})
export class MonsterPageComponent implements OnInit, AfterContentChecked {

  @Input() MONSTER!:string;
  @Input() MonsterHealth!:number;
  @Output() MonsterDead = new EventEmitter<boolean>();
  @Input() HitPower!:number;

  currentHealth:number = 0;
  
  constructor() { }
  ngAfterContentChecked(): void {
    if(this.currentHealth <= 0)
    {
      this.currentHealth = this.MonsterHealth;
    }
  }
  ngOnInit(): void {
    this.currentHealth = this.MonsterHealth; 
   
  }

  getMonsterHealth(){

    const thealth:number = (this.currentHealth *100 / this.MonsterHealth);
    
    if(thealth >= 70)
    {
      return "width: " + thealth + "%; background-color: green;";
    }
    else if(thealth >= 25)
    {
      return "width: " + thealth + "%; background-color: yellow;";
    }
    else
    {
      return "width: " + thealth + "%; background-color: red;";
    }
  }

  attack()
  {
    this.currentHealth -= this.HitPower;
    if(this.currentHealth <= 0)
    {
      this.MonsterDead.emit(true);
    }
  }
}
