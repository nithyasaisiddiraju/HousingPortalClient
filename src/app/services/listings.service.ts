import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Listing} from '../models/listings.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  baseApiUrl: string = environment.baseApiUrl
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.baseApiUrl + '/api/listings')
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
  }

  addListing(listing: any): Observable<any> {
    console.log('Adding listing...');
    console.log(listing);
    return this.http.post<any>(`${this.baseApiUrl}/api/listings`, listing, this.httpOptions).pipe(
      catchError(this.handleError)
    );
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
