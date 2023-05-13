import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  addListingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private listingsService: ListingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addListingForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: [null]
    });
  }

  categories = [
    { id: 1, name: "Apartments" },
    { id: 2, name: "Shared Apartments" },
    { id: 3, name: "Houses" },
    { id: 4, name: "Condos" },
    { id: 5, name: "Shared Houses" },
    { id: 6, name: "Sublets" },
];


  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files;
    if (file && file.length > 0) {
      this.addListingForm.patchValue({ image: file[0] });
      let imageControl = this.addListingForm.get('image');
      if (imageControl) {
        imageControl.updateValueAndValidity();
      }
    }
  }

  onSubmit(): void {
    if (this.addListingForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.addListingForm.value).forEach(key => {
      formData.append(key, this.addListingForm.value[key]);
    });

    this.listingsService.addListing(formData).subscribe(() => {
      this.router.navigate(['/listings']);
    }, error => {
      console.log(error);
    });
  }
}
