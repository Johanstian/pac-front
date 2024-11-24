import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorsCreateComponent } from './contractors-create.component';

describe('ContractorsCreateComponent', () => {
  let component: ContractorsCreateComponent;
  let fixture: ComponentFixture<ContractorsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
