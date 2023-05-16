import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Listing, Student} from '../models/listings.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseApiUrl: string = environment.baseApiUrl
  constructor(private http: HttpClient, private authService: AuthService) { }


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

  getUserDetails(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseApiUrl}/api/user/${id}`, this.httpOptions);
  }

  getUserDetailsWithListings(id: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.baseApiUrl}/api/user/${id}/listings`, this.httpOptions);
  }
}
