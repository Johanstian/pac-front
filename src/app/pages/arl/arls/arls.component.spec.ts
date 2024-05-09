import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArlsComponent } from './arls.component';

describe('ArlsComponent', () => {
  let component: ArlsComponent;
  let fixture: ComponentFixture<ArlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
