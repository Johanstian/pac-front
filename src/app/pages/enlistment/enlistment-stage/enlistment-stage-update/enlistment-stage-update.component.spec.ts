import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistmentStageUpdateComponent } from './enlistment-stage-update.component';

describe('EnlistmentStageUpdateComponent', () => {
  let component: EnlistmentStageUpdateComponent;
  let fixture: ComponentFixture<EnlistmentStageUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlistmentStageUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnlistmentStageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
