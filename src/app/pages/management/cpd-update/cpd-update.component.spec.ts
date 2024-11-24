import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdUpdateComponent } from './cpd-update.component';

describe('CpdUpdateComponent', () => {
  let component: CpdUpdateComponent;
  let fixture: ComponentFixture<CpdUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpdUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpdUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
