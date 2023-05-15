import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ListingDetailsComponent } from './components/listing-details/listing-details.component';
import { UpdateListingComponent } from './components/update-listing/update-listing.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'add-listing', component: AddListingComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'listing-details/:id', component: ListingDetailsComponent, canActivate: [AuthGuard] },
  { path: 'update-listing/:id', component: UpdateListingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
