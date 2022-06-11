import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MonsterPageComponent } from './monster-page/monster-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    MonsterPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
