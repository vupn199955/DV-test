import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStatusButtonComponent } from './login-status-button.component';

describe('LoginStatusButtonComponent', () => {
  let component: LoginStatusButtonComponent;
  let fixture: ComponentFixture<LoginStatusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginStatusButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStatusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
