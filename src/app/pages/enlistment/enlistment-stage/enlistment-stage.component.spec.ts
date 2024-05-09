import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistmentStageComponent } from './enlistment-stage.component';

describe('EnlistmentStageComponent', () => {
  let component: EnlistmentStageComponent;
  let fixture: ComponentFixture<EnlistmentStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlistmentStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnlistmentStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
