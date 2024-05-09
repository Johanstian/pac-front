import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistmentComponent } from './enlistment.component';

describe('EnlistmentComponent', () => {
  let component: EnlistmentComponent;
  let fixture: ComponentFixture<EnlistmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlistmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnlistmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
