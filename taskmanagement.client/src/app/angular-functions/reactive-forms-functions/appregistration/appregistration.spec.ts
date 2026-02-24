import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Appregistration } from './appregistration';

describe('Appregistration', () => {
  let component: Appregistration;
  let fixture: ComponentFixture<Appregistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Appregistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Appregistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
