import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tutorial } from '../_helper/tutorial.helper';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

@Input() PAGE!:number;
@Output() changePage=new EventEmitter<number>();
@Output() EndTutorial=new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    if(this.PAGE==undefined){
      this.PAGE=0;
    }
  }

  nextPage(){
    if(this.PAGE==2)
    {
      this.EndOfTutorial();
    }
    this.PAGE++;
    this.changePage.emit(this.PAGE);
    
  }

  EndOfTutorial(){
    this.EndTutorial.emit();
  }
}
