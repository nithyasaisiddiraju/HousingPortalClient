import { Component, OnInit } from '@angular/core';
import { Listing, Student } from 'src/app/models/listings.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user!: Student;
  listings: Listing[] = [];

  constructor(private userService: UserService,public authService: AuthService) { }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.userService.getUserDetails(userId).subscribe(
        (user: Student) => {
          console.log(user);
          this.user = user;
        },
        (error) => {
          console.error('Error retrieving user details:', error);
        }
      );
      this.userService.getUserDetailsWithListings(userId).subscribe(
        (listings: Listing[]) => {
          console.log(listings);
          this.listings = listings;
        },
        (error) => {
          console.error('Error retrieving user listings:', error);
        }
      );
    }
  }
}
