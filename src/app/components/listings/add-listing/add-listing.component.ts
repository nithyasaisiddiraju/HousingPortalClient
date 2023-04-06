import { Component, OnInit } from '@angular/core';
import { Listings } from 'src/app/models/listings.model';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit{

  addListingRequest: Listings = {
    id: 0,
    title: '',
    description: '',
    address: '',
    price: 0,
    contact: '',
    email: '',
    userid: '',
    createdAt: '',
    updatedAt: ''
  }

  constructor(private listingService: ListingsService) { }

  ngOnInit(): void {

  }

  addListing() {
    this.listingService.addListing(this.addListingRequest)
    .subscribe({
      next: (listing) => {
        console.log(listing);
      }
    })
  }
}

