import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdCreateComponent } from './cpd-create.component';

describe('CpdCreateComponent', () => {
  let component: CpdCreateComponent;
  let fixture: ComponentFixture<CpdCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpdCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpdCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
