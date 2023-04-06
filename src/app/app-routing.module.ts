import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListingComponent } from './components/listings/add-listing/add-listing.component';
import { EditListingComponent } from './components/listings/edit-listing/edit-listing.component';
import { PropertiesListComponent } from './components/listings/properties-list/properties-list.component';

const routes: Routes = [
  { path: '', component: PropertiesListComponent },
  { path: 'listings', component: PropertiesListComponent},
  { path: 'listings/add', component: AddListingComponent},
  { path: 'listings/edit/:id', component: EditListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
