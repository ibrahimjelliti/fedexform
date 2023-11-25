import { CommonModule } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

import { PasswordValidator } from '../../validators/password.validator';
import { UserService } from '../../services/user/user.service';
import { mapUserModelToUserRequest } from '../../models/mappers/user.mapper';

export class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (
      !!form?.form.hasError('password') ||
      !!(
        control &&
        (control.hasError('required') || control.hasError('minlength')) &&
        (control.dirty || control.touched)
      )
    );
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public passwordMatcher = new PasswordErrorStateMatcher();
  public created = false;
  public subtitle = 'To sign up please enter your details below.';
  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.signUpForm.statusChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }
  public signUpForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: [PasswordValidator] }
  );

  public onSubmit() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.userService
        .postUser(mapUserModelToUserRequest(this.signUpForm.value))
        .subscribe((res) => {
          this.created = true;
          this.subtitle = `Welcome, ${this.FormControl.firstName.value} !`,
          this._snackBar.open('User created successfully', 'X', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        });
    }
  }

  get FormControl() {
    return this.signUpForm.controls;
  }

  getEmailErrorMessage() {
    const emailControl = this.signUpForm.get('email')!;
    if (emailControl.hasError('required') && emailControl.touched) {
      return 'Email is required';
    }

    return emailControl.hasError('pattern') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    const passwordControl = this.signUpForm.get('password')!;
    if (passwordControl.hasError('required') && passwordControl.touched) {
      return 'Password is required';
    }
    if (passwordControl.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }

    if (this.signUpForm.hasError('password')) {
      if (!this.signUpForm.getError('password').containsAlpha) {
        return 'Password must contain alphatic letters only';
      } else if (!this.signUpForm.getError('password').containsUpperCase) {
        return 'Password must contain uppercase letters';
      } else if (!this.signUpForm.getError('password').containsLowerCase) {
        return 'Password must contain lowercase letters';
      } else if (
        !this.signUpForm.getError('password').containsNoNameAndNoSurname
      ) {
        return 'Password must not contain your first or last name';
      }
    }
    return '';
  }
}
