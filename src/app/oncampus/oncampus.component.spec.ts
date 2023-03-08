import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OncampusComponent } from './oncampus.component';

describe('OncampusComponent', () => {
  let component: OncampusComponent;
  let fixture: ComponentFixture<OncampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OncampusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OncampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
