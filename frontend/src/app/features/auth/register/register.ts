
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { RegistrationStateService } from '../../../core/services/registration-state.service';

// Vérifie que les deux mots de passe sont identiques
function passwordsMatch(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmation = control.get('confirmPassword')?.value;

  if (!password || !confirmation) {
    return null;
  }

  return password === confirmation
    ? null
    : { passwordsMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {

  submitted = false;
  showPassword = false;
  private router = inject(Router);
  private registrationState = inject(RegistrationStateService);

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        lastName: [
          '',
          [
            Validators.required,
            Validators.maxLength(80)
          ]
        ],

        firstName: [
          '',
          [
            Validators.required,
            Validators.maxLength(80)
          ]
        ],

        birthDate: [
          '',
          Validators.required
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],

        confirmPassword: [
          '',
          Validators.required
        ],

        acceptTerms: [
          false,
          Validators.requiredTrue
        ]
      },
      {
        validators: passwordsMatch
      }
    );
  }

  // Affiche ou masque le mot de passe
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Vérifie le formulaire lors de la soumission
  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const form = this.registerForm.getRawValue();

    this.registrationState.setData({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      birthday: form.birthDate
    });

    this.router.navigate(['/onboarding']);
  }
}
