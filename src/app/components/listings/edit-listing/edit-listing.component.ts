import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listings } from 'src/app/models/listings.model';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit{

  listingDetails: Listings = {
    id: '',
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
  constructor(private route: ActivatedRoute, private listingsService: ListingsService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')
        if(id){
          this.listingsService.getListing(id)
          .subscribe({
            next: (response) => {
              this.listingDetails = response;
            }
          })
        }
      }
  })
  }

  updateListing() {
    this.listingsService.updateListing(this.listingDetails.id,
      this.listingDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['listings']);
        }
      })
  }

  deleteListing(id: string) {
    this.listingsService.deleteListing(id)
      .subscribe({
        next: (response) => {
          this.router.navigate(['listings']);
        }
      })
  }
}
