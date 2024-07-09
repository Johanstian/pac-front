import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndertakeComponent } from './undertake.component';

describe('UndertakeComponent', () => {
  let component: UndertakeComponent;
  let fixture: ComponentFixture<UndertakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndertakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndertakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
