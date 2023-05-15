import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ListingsService } from 'src/app/services/listings.service';
import { UserService } from 'src/app/services/user.service';
import { AddListingComponent } from './add-listing.component';
import { of } from 'rxjs';

describe('AddListingComponent', () => {
  let component: AddListingComponent;
  let fixture: ComponentFixture<AddListingComponent>;

  let mockListingsService = jasmine.createSpyObj(['addListing']);
  let mockRouter = jasmine.createSpyObj(['navigate']);
  let mockAuthService = jasmine.createSpyObj('AuthService', ['getCurrentUserId']);
  let mockUserService = jasmine.createSpyObj('UserService', ['getUserDetails']);


  beforeEach(async () => {
    mockAuthService.getCurrentUserId.and.returnValue('3F0D6B98-4809-455D-85F0-464188966267');
    mockUserService.getUserDetails.and.returnValue(of({
      "studentId": "3F0D6B98-4809-455D-85F0-464188966267",
      "name": "Pradeep",
      "email": "listing@example.com",
      "phone": "(213) 555-9997",
      "major": "Computer Science",
      "graduationYear": 2025
    }));

    await TestBed.configureTestingModule({
      declarations: [ AddListingComponent ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: ListingsService, useValue: mockListingsService },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
