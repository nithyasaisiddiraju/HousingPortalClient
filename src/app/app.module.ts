import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertiesListComponent } from './components/listings/properties-list/properties-list.component';
import { AddListingComponent } from './components/listings/add-listing/add-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule along with FormsModule
import { EditListingComponent } from './components/listings/edit-listing/edit-listing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertiesListComponent,
    AddListingComponent,
    EditListingComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule // Add ReactiveFormsModule to imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
