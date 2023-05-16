import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { UpdateListingComponent } from './update-listing.component';
import { ListingsService } from 'src/app/services/listings.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UpdateListingComponent', () => {
  let component: UpdateListingComponent;
  let fixture: ComponentFixture<UpdateListingComponent>;
  let mockListingService: Partial<ListingsService>;

  beforeEach(async () => {
    mockListingService = {
      updateListing: jasmine.createSpy('updateListing').and.returnValue(of({
        message: 'Listing updated successfully'
      })),
      getListing: jasmine.createSpy('getListing').and.returnValue(of({
        "listingId": "10AF29D2-85E5-4240-9368-E6EE45BFF80E",
        "title": "Modern 3BR",
        "description": "Comfortable apartment in the heart of the city",
        "address": "123 Main St",
        "price": 1000.00,
        "city": "New York",
        "state": "NY",
        "zip": "12345",
        "image": "image3.jpg",
        "studentDto": {
          "studentId": "3F0D6B98-4809-455D-85F0-464188966267",
          "name": "Nithya",
          "email": "listing@example.com",
          "phone": "(213) 555-9997",
          "major": "Computer Science",
          "graduationYear": 2025
        }
      }))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule],
      declarations: [ UpdateListingComponent ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ key: 'value' })
            }
          }
        },
        {
          provide: ListingsService,
          useValue: mockListingService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
