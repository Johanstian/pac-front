import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementUpdateComponent } from './management-update.component';

describe('ManagementUpdateComponent', () => {
  let component: ManagementUpdateComponent;
  let fixture: ComponentFixture<ManagementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
