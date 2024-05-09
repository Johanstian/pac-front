import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreEnlistmentStageComponent } from './pre-enlistment-stage.component';

describe('PreEnlistmentStageComponent', () => {
  let component: PreEnlistmentStageComponent;
  let fixture: ComponentFixture<PreEnlistmentStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreEnlistmentStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreEnlistmentStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
