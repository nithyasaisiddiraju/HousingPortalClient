import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing } from 'src/app/models/listings.model';

@Component({
  selector: 'listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})

export class ListingDetailsComponent implements OnInit {
  id: string = '';
  listing?: Listing;

  constructor(private route: ActivatedRoute, private listingsService: ListingsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.listingsService.getListing(this.id).subscribe(
      (data: Listing) => {
        this.listing = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
}
