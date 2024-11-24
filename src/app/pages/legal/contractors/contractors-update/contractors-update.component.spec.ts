import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorsUpdateComponent } from './contractors-update.component';

describe('ContractorsUpdateComponent', () => {
  let component: ContractorsUpdateComponent;
  let fixture: ComponentFixture<ContractorsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
