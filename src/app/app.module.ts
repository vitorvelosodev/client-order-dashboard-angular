import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterInputComponent } from './filter-input/filter-input.component';
import { ClientTableComponent } from './client-table/client-table.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterInputComponent,
    ClientTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
