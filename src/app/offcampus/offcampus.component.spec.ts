import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcampusComponent } from './offcampus.component';

describe('OffcampusComponent', () => {
  let component: OffcampusComponent;
  let fixture: ComponentFixture<OffcampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffcampusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
