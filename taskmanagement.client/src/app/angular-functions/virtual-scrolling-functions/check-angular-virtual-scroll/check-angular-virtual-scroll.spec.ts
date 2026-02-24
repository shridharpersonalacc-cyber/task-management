import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAngularVirtualScroll } from './check-angular-virtual-scroll';

describe('CheckAngularVirtualScroll', () => {
  let component: CheckAngularVirtualScroll;
  let fixture: ComponentFixture<CheckAngularVirtualScroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckAngularVirtualScroll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAngularVirtualScroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
