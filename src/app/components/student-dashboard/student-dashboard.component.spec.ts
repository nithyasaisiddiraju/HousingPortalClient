import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentDashboardComponent } from './student-dashboard.component';
import { ListingsService } from 'src/app/services/listings.service';
import { of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('StudentDashboardComponent', () => {
  let component: StudentDashboardComponent;
  let fixture: ComponentFixture<StudentDashboardComponent>;
  let mockListingService = jasmine.createSpyObj('ListingService', ['getAllListings']);

  beforeEach(async () => {
    mockListingService.getAllListings.and.returnValue(of([
      {
        "listingId": "c4f9828e-71a0-42a1-88e2-86a99d0e1b9e",
        "title": "Family Home",
        "description": "Spacious family home with a large backyard",
        "address": "321 Willow Ln",
        "price": 2000,
        "city": "Los Angeles",
        "state": "CA",
        "zip": "90001",
        "image": "image8.jpg",
        "studentDto": {
          "studentId": "1a6822db-2a99-4c1d-9e06-07ae6c8f7b57",
          "name": "David Brown",
          "email": "listing8@example.com",
          "phone": "(213) 555-7777",
          "major": "Computer Science",
          "graduationYear": 2024
        }
      },
      {
        "listingId": "59d2698c-8f9c-4f57-87cd-a5c35f0b5416",
        "title": "Spacious 2BR",
        "description": "A two-bedroom apartment with lots of natural light",
        "address": "456 Park Ave",
        "price": 1200,
        "city": "New York",
        "state": "NY",
        "zip": "10001",
        "image": "image2.jpg",
        "studentDto": {
          "studentId": "98ceee6f-5768-4f84-a5f2-16f31a3a7a51",
          "name": "John Doe",
          "email": "listing1@example.com",
          "phone": "(212) 555-1234",
          "major": "Computer Science",
          "graduationYear": 2024
          }
      },
      {
        "listingId": "59d2698c-8f9c-4f57-87cd-a5c35f0b5416",
        "title": "Spacious 2BR",
        "description": "A two-bedroom apartment with lots of natural light",
        "address": "456 Park Ave",
        "price": 1200,
        "city": "New York",
        "state": "NY",
        "zip": "10001",
        "image": "image2.jpg",
        "studentDto": {
          "studentId": "98ceee6f-5768-4f84-a5f2-16f31a3a7a51",
          "name": "John Doe",
          "email": "listing1@example.com",
          "phone": "(212) 555-1234",
          "major": "Computer Science",
          "graduationYear": 2024
        }
      }
    ]));

    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardComponent ],
      imports: [ HttpClientTestingModule, RouterModule ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'value' })
          }
        },
        {
          provide: ListingsService,
          useValue: mockListingService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
