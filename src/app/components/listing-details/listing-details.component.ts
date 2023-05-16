import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing } from 'src/app/models/listings.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  id: string = '';
  listing?: Listing;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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

  onDelete(listingId: string): void {
    console.log('Deleting Property: ' + listingId);
    this.listingsService.deleteListing(listingId).subscribe(
      () => {
        console.log('Listing deleted successfully: ' + listingId);
        this.snackBar.open('Property deleted successfully!', 'OK', {
          duration: 4000,
        });
        this.router.navigate(['/student-dashboard']);
      },
      (error) => {
        console.error('An error occurred while deleting the listing:', error);
      }
    );
  }

  onEdit(id: number) {
    this.router.navigate(['/update-listing', id]);
  }
}
