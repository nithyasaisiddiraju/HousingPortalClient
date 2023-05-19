import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Student } from './models/listings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'CSUN Off-Campus Housing Portal';
  isAuthenticated = false;
  private authStatusSub: Subscription;
  loggedUsername: string = '';

  constructor(public authService: AuthService, public router: Router, public UserService: UserService) {
    this.authStatusSub = this.authService.authStatus.subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated
    );
  }

  ngOnInit(): void {
    this.authStatusSub = this.authService.authStatus.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          const userId = this.authService.getCurrentUserId();
          console.log('userId:', userId);
          if (userId) {
            this.UserService.getUserDetails(userId).subscribe(
              (user: Student) => {
                this.loggedUsername = user.name;
                console.log('loggedUsername:', this.loggedUsername);
              },
              (error) => {
                console.error('Error retrieving user details:', error);
              }
            );
          }
        }
      }
    );
  }

  isCurrentRoute(route: string) {
    return this.router.url.startsWith(route);
  }

  ngOnDestroy() {
    if (this.authStatusSub) {
      this.authStatusSub.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/logout']);
  }
}
