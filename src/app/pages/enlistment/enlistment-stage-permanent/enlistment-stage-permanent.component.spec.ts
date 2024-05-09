import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistmentStagePermanentComponent } from './enlistment-stage-permanent.component';

describe('EnlistmentStagePermanentComponent', () => {
  let component: EnlistmentStagePermanentComponent;
  let fixture: ComponentFixture<EnlistmentStagePermanentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlistmentStagePermanentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnlistmentStagePermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
