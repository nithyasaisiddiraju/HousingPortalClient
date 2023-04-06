import { Component, OnInit } from '@angular/core';
import { Listings } from 'src/app/models/listings.model';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit{
  listings: Listings[] = [];

  constructor(private listingsService: ListingsService) {}
  ngOnInit(): void {
    this.listingsService.getAllListings()
    .subscribe({
      next: (listings) => {
        this.listings = listings;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
