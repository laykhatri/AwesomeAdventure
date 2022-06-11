import { Component, Input, OnInit, Output, EventEmitter , AfterContentChecked} from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-monster-page',
  templateUrl: './monster-page.component.html',
  styleUrls: ['./monster-page.component.css'],
  animations:[
    trigger('gotHIT',[
      state('true',style({})),
      state('false',style({})),
      transition('false => true',[
        animate('0.5s',keyframes([
          style({transform: 'translate(1px, 1px) rotate(0deg)'}),
          style({transform: 'translate(-1px, -2px) rotate(-1deg)'}),
          style({transform: 'translate(-3px, 0px) rotate(1deg)'}),
          style({transform: 'translate(3px, 2px) rotate(0deg)'}),
          style({transform: 'translate(1px, -1px) rotate(1deg)'}),
          style({transform: 'translate(-1px, 2px) rotate(-1deg)'}),
          style({transform: 'translate(-3px, 1px) rotate(0deg)'}),
          style({transform: 'translate(3px, 1px) rotate(-1deg)'}),
          style({transform: 'translate(-1px, -1px) rotate(1deg)'}),
          style({transform: 'translate(1px, 2px) rotate(0deg)'}),
          style({transform: 'translate(1px, -2px) rotate(-1deg)'}),          
        ])),
        
      ])
    ]),
  ]
})
export class MonsterPageComponent implements OnInit, AfterContentChecked {

  @Input() MONSTER!:string;
  @Input() MonsterHealth!:number;
  @Output() MonsterDead = new EventEmitter<boolean>();
  @Input() HitPower!:number;

  isHit: boolean = false;
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
    this.isHit = true;
    setTimeout(() => {
      this.isHit = false;
    },500);
    this.currentHealth -= this.HitPower;
    if(this.currentHealth <= 0)
    {
      this.MonsterDead.emit(true);
    }
  }

  
}
