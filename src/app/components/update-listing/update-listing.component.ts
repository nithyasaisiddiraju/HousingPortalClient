import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListingsService } from 'src/app/services/listings.service';
import { Listing } from 'src/app/models/listings.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-listing',
  templateUrl: './update-listing.component.html',
  styleUrls: ['./update-listing.component.css']
})
export class UpdateListingComponent implements OnInit {
  updateListingForm: FormGroup = this.formBuilder.group({});
  listingId: string = '';
  listing: Listing | undefined;

  categories = [
    { id: 1, name: "Apartments" },
    { id: 2, name: "Shared Apartments" },
    { id: 3, name: "Houses" },
    { id: 4, name: "Condos" },
    { id: 5, name: "Shared Houses" },
    { id: 6, name: "Sublets" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.updateListingForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.listingId = this.route.snapshot.paramMap.get('id') || '';
    this.createUpdateListingForm();
    this.loadListingDetails();
  }

  createUpdateListingForm(): void {
    this.updateListingForm = this.formBuilder.group({
        listingId: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        image: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', Validators.required],
        category: ['', Validators.required],
        studentDto: this.formBuilder.group({
            studentId: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            major: ['', Validators.required],
            graduationYear: ['', Validators.required]
        })
    });
}


loadListingDetails(): void {
  this.listingsService.getListing(this.listingId).subscribe(
      (data: Listing) => {
          this.listing = data;
          if (!this.checkUserAuthorization()) {
              this.snackBar.open('You do not have permission to edit this listing.', 'Close', {
                  duration: 4000,
                  panelClass: 'snackbar-error'
              });
              this.router.navigate(['/listing-details', this.listingId]);
          } else {
              this.updateListingForm.patchValue({
                  listingId : this.listing?.listingId,
                  title: this.listing?.title,
                  description: this.listing?.description,
                  price: this.listing?.price,
                  address: this.listing?.address,
                  city: this.listing?.city,
                  state: this.listing?.state,
                  zip: this.listing?.zip,
                  image: this.listing?.image,
                  studentDto: {
                      studentId: this.listing?.studentDto.studentId,
                      name: this.listing?.studentDto.name,
                      email: this.listing?.studentDto.email,
                      phone: this.listing?.studentDto.phone,
                      major: this.listing?.studentDto.major,
                      graduationYear: this.listing?.studentDto.graduationYear
                  }
              });
          }
      },
      (error) => {
          console.error('There was an error!', error);
      }
  );
}




  onSubmit(): void {
    console.log('Updating form...');
    console.log(this.updateListingForm.value);
    if (this.updateListingForm && this.updateListingForm.invalid) {
      return;
    }

    this.listingsService.updateListing(this.listingId, this.updateListingForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.snackBar.open('Listing updated successfully!', 'Close', {
            duration: 4000,
            panelClass: 'snackbar-success'
          });
          this.router.navigate(['/listing-details', this.listingId]);
        },
        error => {
          console.error('Error updating listing:', error);
          this.snackBar.open('An error occurred while updating the listing.', 'Close', {
            duration: 3000,
            panelClass: 'snackbar-error'
          });
        }
      );
  }

  checkUserAuthorization(): boolean {
    const currentUserId = this.authService.getCurrentUserId();
    if (this.listing && currentUserId) {
      return this.listing.studentDto.studentId === currentUserId;
    }
    return false;
  }
}
