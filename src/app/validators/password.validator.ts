import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export const PasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  if (!password?.value) {
    return null;
  }
  const containsAlpha = /^[a-zA-Z]+$/.test(password.value);
  const containsUpperCase = /[A-Z]+/.test(password.value);
  const containsLowerCase = /[a-z]+/.test(password.value);

  let containsNoNameAndNoSurname = false;
  if (control.get('firstName')?.value) {
    containsNoNameAndNoSurname = !password.value
      .toLowerCase()
      .includes(control.get('firstName')?.value.toLowerCase());
  }
  if (control.get('lastName')?.value) {
    containsNoNameAndNoSurname &&= !password.value
      .toLowerCase()
      .includes(control.get('lastName')?.value.toLowerCase());
  }
  const validPassword =
    containsAlpha &&
    containsUpperCase &&
    containsLowerCase &&
    containsNoNameAndNoSurname;

  return !validPassword
    ? {
        password: {
          containsAlpha,
          containsUpperCase,
          containsLowerCase,
          containsNoNameAndNoSurname,
        },
      }
    : null;
};
