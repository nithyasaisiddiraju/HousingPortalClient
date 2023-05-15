import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ListingsService } from 'src/app/services/listings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  addListingForm!: FormGroup;
  loggedInStudentId : string="";
  student:any;
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
    private listingsService: ListingsService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.addListingForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      image: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
      category: ['', Validators.required],
      studentDto: this.formBuilder.group({
        studentId: ['']
      })
    });
  }

  ngOnInit(): void {
    let userId = this.authService.getCurrentUserId();
    this.loggedInStudentId = userId ? userId : "";
    this.student = {};

    this.userService.getUserDetails(this.loggedInStudentId).subscribe(
      (response) => {
        this.student = response;
        console.log("Student Details: " + this.student.studentId);

        // Update the studentId form control
        this.addListingForm.get('studentDto')?.get('studentId')?.setValue(this.student.studentId);
      },
      (error) => {
        // Handle error if necessary
        console.error(error);
      }
    );
  }

  onSubmit = (): void => {
    console.log('Submitting form...');
    if (this.addListingForm.invalid) {
      return;
    }

    const formValue = {
      ...this.addListingForm.value,
      studentDto: {
        ...this.addListingForm.value.studentDto,
        studentId: this.student.studentId,
        name: this.student.name,
        email: this.student.email,
        phone: this.student.phone,
        graduationYear: this.student.graduationYear,
        major: this.student.major
      }
    };

    this.listingsService.addListing(formValue)
    .subscribe(
        response => {
            this.router.navigate(['/student-dashboard']);
        },
        error => {
            console.error('Error submitting form:', error);
        }
    );
  }
}

