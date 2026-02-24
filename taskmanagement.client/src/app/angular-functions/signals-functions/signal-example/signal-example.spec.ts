import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalExample } from './signal-example';

describe('SignalExample', () => {
  let component: SignalExample;
  let fixture: ComponentFixture<SignalExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignalExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
