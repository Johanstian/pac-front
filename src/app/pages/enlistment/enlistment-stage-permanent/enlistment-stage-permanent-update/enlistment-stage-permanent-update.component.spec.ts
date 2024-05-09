import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistmentStagePermanentUpdateComponent } from './enlistment-stage-permanent-update.component';

describe('EnlistmentStagePermanentUpdateComponent', () => {
  let component: EnlistmentStagePermanentUpdateComponent;
  let fixture: ComponentFixture<EnlistmentStagePermanentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlistmentStagePermanentUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnlistmentStagePermanentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
