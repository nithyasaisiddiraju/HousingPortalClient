import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UpdateListingComponent } from './update-listing.component';
import { ListingsService } from 'src/app/services/listings.service';

describe('UpdateListingComponent', () => {
  let component: UpdateListingComponent;
  let fixture: ComponentFixture<UpdateListingComponent>;

  let mockListingService = jasmine.createSpyObj('ListingService', ['getListingById', 'updateListing']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateListingComponent ],
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

    mockListingService.getListingById.and.returnValue(of({
      "listingId": "10AF29D2-85E5-4240-9368-E6EE45BFF80E",
      "title": "Modern 7BR",
      "description": "Comfortable 7 BRapartment in the heart of the city",
      "address": "123 Main St",
      "price": 7000.00,
      "city": "New York",
      "state": "NY",
      "zip": "12345",
      "image": "image3.jpg",
      "studentDto": {
        "studentId": "3F0D6B98-4809-455D-85F0-464188966267",
        "name": "Pradeep",
        "email": "listing@example.com",
        "phone": "(213) 555-9997",
        "major": "Computer Science",
        "graduationYear": 2025
      }
    }));

    mockListingService.updateListing.and.returnValue(of({
      message: "Listing updated successfully"
    }));

    fixture = TestBed.createComponent(UpdateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
