import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ListingsService } from 'src/app/services/listings.service';
import { Listings } from 'src/app/models/listings.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  listings: Listings[] = [];

  constructor(private authService: AuthService, private router: Router, private listingsService: ListingsService) { }

  ngOnInit(): void {
    this.listingsService.getAllListings().subscribe(listings => {
      this.listings = listings;
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
