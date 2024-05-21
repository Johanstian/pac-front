import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetestsComponent } from './retests.component';

describe('RetestsComponent', () => {
  let component: RetestsComponent;
  let fixture: ComponentFixture<RetestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
