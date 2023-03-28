import { Component, OnInit } from '@angular/core';
import { OffcampusListingService } from '../app.service';

@Component({
  selector: 'app-offcampus',
  templateUrl: './offcampus.component.html',
  styleUrls: ['./offcampus.component.css']
})
export class OffcampusComponent implements OnInit{
  listings: any[] = [];
  displayedColumns = ['title', 'description', 'price', 'contact'];

  constructor(private offcampusListingService: OffcampusListingService) { }

  ngOnInit(): void {
    this.offcampusListingService.getOffCampusListings().subscribe(
      data => this.listings = data,
      error => console.error(error)
    );
  }
}
