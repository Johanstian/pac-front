import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InductionUpdateComponent } from './induction-update.component';

describe('InductionUpdateComponent', () => {
  let component: InductionUpdateComponent;
  let fixture: ComponentFixture<InductionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InductionUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InductionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
