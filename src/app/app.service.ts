import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffcampusListingService {
  private apiUrl = 'http://localhost:7068/api/offcampuslistings';

  constructor(private http: HttpClient) { }

  getOffCampusListings() {
    return this.http.get<any>(this.apiUrl, { responseType: 'json' });
  }
}
