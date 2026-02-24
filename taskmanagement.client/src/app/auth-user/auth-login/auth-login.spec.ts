import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLogin } from './auth-login';

describe('AuthLogin', () => {
  let component: AuthLogin;
  let fixture: ComponentFixture<AuthLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
