import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OffcampusComponent } from './offcampus/offcampus.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'offcampus', component:OffcampusComponent},
  {path:'**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
