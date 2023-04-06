import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Listings } from '../models/listings.model';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  baseApiUrl: string = environment.baseApiUrl
  constructor(private http: HttpClient) { }

  getAllListings(): Observable<Listings[]> {
    return this.http.get<Listings[]>(this.baseApiUrl + '/api/listings')
  }

  addListing(addListingRequest: Listings): Observable<Listings> {
    addListingRequest.id = 0;
    return this.http.post<Listings>(this.baseApiUrl + '/api/listings', addListingRequest);
  }
}
