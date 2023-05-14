import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl: string = environment.baseApiUrl;
  private tokenKey: string = 'jwt-token';
  private _authStatus = new Subject<boolean>();
  private currentUserSubject: BehaviorSubject<any>;

  public authStatus = this._authStatus.asObservable();
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(this.tokenKey) || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public getCurrentUserId() {
    return this.currentUserValue.id;
  }

  isAuthenticated() : boolean {
    return this.getToken() != null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string) {
    const body = { UserName: username, Password: password };
    return this.http.post<any>(`${this.baseApiUrl}/api/user/authenticate`, body)
    .pipe(
      tap(user => {
        if (user && user.token) {
          localStorage.setItem(this.tokenKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
          this._authStatus.next(true);
          this.router.navigate(['/student-dashboard']);
        }
      }),
      catchError(err => {
        console.error('Error during login request:', err);
        throw err;
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseApiUrl}/api/user/register`, body);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this._authStatus.next(false);
  }
}
