
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

    // Pour le moment, aucune requête vers le backend.
    // Nous connecterons ensuite le formulaire à Spring Boot.
    console.log(
      'Formulaire valide',
      this.registerForm.value
    );
  }
}
