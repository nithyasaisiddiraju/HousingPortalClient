import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Listing} from '../models/listings.model';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  baseApiUrl: string = environment.baseApiUrl
  constructor(private http: HttpClient) { }

  getAllListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.baseApiUrl + '/api/listings')
  }

  addListing(addListingRequest: FormData): Observable<Listing> {
    return this.http.post<Listing>(this.baseApiUrl + '/api/listings', addListingRequest);
  }

  getListing(id: string): Observable<Listing> {
    return this.http.get<Listing>(`${this.baseApiUrl}/api/listings/${id}`);
  }

  updateListing(id: string, updateListingRequest: Listing):
  Observable<Listing> {
    return this.http.put<Listing>(this.baseApiUrl + '/api/listings/' + id,
    updateListingRequest);
  }

  deleteListing(id: string): Observable<Listing> {
    return this.http.delete<Listing>(this.baseApiUrl + '/api/listings/' + id);
  }
}
