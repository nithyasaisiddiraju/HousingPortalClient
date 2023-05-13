import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { AddListingComponent } from './components/add-listing/add-listing.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'add-listing', component: AddListingComponent, canActivate: [AuthGuard] },
  //{ path: 'find-roommate', component: FindRoommateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
