import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArlUpdateComponent } from './arl-update.component';

describe('ArlUpdateComponent', () => {
  let component: ArlUpdateComponent;
  let fixture: ComponentFixture<ArlUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArlUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArlUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

