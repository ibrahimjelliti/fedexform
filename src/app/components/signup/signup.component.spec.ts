import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['postUser']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [SignupComponent, NoopAnimationsModule],
      providers: [HttpClient, HttpHandler, 
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all form controls as touched on form submission', () => {
    component.onSubmit();
    expect(component.signUpForm.get('firstName')?.touched).toBeTrue();
    expect(component.signUpForm.get('lastName')?.touched).toBeTrue();
    expect(component.signUpForm.get('email')?.touched).toBeTrue();
    expect(component.signUpForm.get('password')?.touched).toBeTrue();
  });

  it('should not call postUser and not display snackbar when form is invalid', fakeAsync(() => {
    component.onSubmit();
    tick(); // wait for asynchronous operations

    expect(userServiceSpy.postUser).not.toHaveBeenCalled();
    expect(snackBarSpy.open).not.toHaveBeenCalled();
  }));

  it('should call postUser and display snackbar when form is valid', fakeAsync(() => {
    // Mock the postUser method to return an observable
    userServiceSpy.postUser.and.returnValue(of({_id: '123', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com'}));

    // Set valid values for the form controls
    component.signUpForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'securePassword',
    });

    component.onSubmit();
    tick(); // wait for asynchronous operations

    expect(userServiceSpy.postUser).toHaveBeenCalledWith(jasmine.any(Object));
    expect(snackBarSpy.open).toHaveBeenCalledWith('User created successfully', 'X', jasmine.any(Object));
  }));
});
