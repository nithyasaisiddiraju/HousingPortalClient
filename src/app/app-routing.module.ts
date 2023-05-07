import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListingComponent } from './components/listings/add-listing/add-listing.component';
import { EditListingComponent } from './components/listings/edit-listing/edit-listing.component';
import { PropertiesListComponent } from './components/listings/properties-list/properties-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: PropertiesListComponent },
  { path: 'listings', component: PropertiesListComponent},
  { path: 'listings/add', component: AddListingComponent},
  { path: 'listings/edit/:id', component: EditListingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
