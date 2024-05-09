import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArlAffiliationComponent } from './arl-affiliation.component';

describe('ArlAffiliationComponent', () => {
  let component: ArlAffiliationComponent;
  let fixture: ComponentFixture<ArlAffiliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArlAffiliationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArlAffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
