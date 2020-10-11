import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GgLoginButtonComponent } from './gg-login-button.component';

describe('GgLoginButtonComponent', () => {
  let component: GgLoginButtonComponent;
  let fixture: ComponentFixture<GgLoginButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GgLoginButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GgLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
