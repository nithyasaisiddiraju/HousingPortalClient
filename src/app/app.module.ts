import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertiesListComponent } from './components/listings/properties-list/properties-list.component';
import { AddListingComponent } from './components/listings/add-listing/add-listing.component';
import { FormsModule } from '@angular/forms';
import { EditListingComponent } from './components/listings/edit-listing/edit-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertiesListComponent,
    AddListingComponent,
    EditListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
