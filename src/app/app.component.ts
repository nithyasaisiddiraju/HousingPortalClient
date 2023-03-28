import { Component } from '@angular/core';
import { OffcampusListingService } from '../app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CSUN Housing Portal';
  constructor(private service: OffcampusListingService) { }
  ngOnInit(): void {
    this.service.getOffCampusListings();
  }
}
