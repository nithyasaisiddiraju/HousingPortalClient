import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ListingDetailsComponent } from './components/listing-details/listing-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateListingComponent } from './components/update-listing/update-listing.component';
import { AccountComponent } from './components/account/account.component';
import { AuthModule } from '@auth0/auth0-angular';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    StudentDashboardComponent,
    AddListingComponent,
    LogoutComponent,
    ListingDetailsComponent,
    UpdateListingComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AuthModule.forRoot({
      domain: 'dev-mx4cd1prbruu8h7h.us.auth0.com',
      clientId: 'zAQkK2U6zHiyNh2XI50UaI8quyu9RYNz',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
