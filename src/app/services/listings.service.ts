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
    addListingRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Listings>(this.baseApiUrl + '/api/listings', addListingRequest);
  }

  getListing(id: string): Observable<Listings> {
    return this.http.get<Listings>(`${this.baseApiUrl}/api/listings/${id}`);
  }

  updateListing(id: string, updateListingRequest: Listings):
  Observable<Listings> {
    return this.http.put<Listings>(this.baseApiUrl + '/api/listings/' + id,
    updateListingRequest);
  }

  deleteListing(id: string): Observable<Listings> {
    return this.http.delete<Listings>(this.baseApiUrl + '/api/listings/' + id);
  }
}
