import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentDashboardComponent } from './student-dashboard.component';
import { ListingsService } from 'src/app/services/listings.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('StudentDashboardComponent', () => {
  let component: StudentDashboardComponent;
  let fixture: ComponentFixture<StudentDashboardComponent>;
  let mockListingService = jasmine.createSpyObj('ListingService', ['getAllListings']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardComponent ],
      imports: [ HttpClientTestingModule ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'value' }) // provide a mock paramMap observable
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
