import { Component, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AddressSuggestion {
  label: string;
  coordinates: [number, number];
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss'
})
export class OnboardingComponent implements OnDestroy {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Navigation
  currentStep = 1;

  // Étape 1 : genre
  gender = '';
  genderError = false;

  // Étape 2 : sports
  sports: string[] = [];
  sportsError = false;

  readonly availableSports = [
    'Football',
    'Basketball',
    'Tennis',
    'Running',
    'Musculation',
    'Natation',
    'Cyclisme',
    'Badminton',
    'Volleyball',
    'Escalade',
    'Rugby',
    'Danse'
  ];

  // Étape 3 : adresse
  location = '';
  addressSuggestions: AddressSuggestion[] = [];
  selectedAddress: AddressSuggestion | null = null;
  addressError = '';
  addressLoading = false;

  // Étape 4 : profil facultatif
  description = '';
  phone = '';
  photoFile: File | null = null;
  photoPreview: string | null = null;
  photoError = '';

  // Genre
  selectGender(gender: string): void {
    this.gender = gender;
    this.genderError = false;
  }

  // Sports
  toggleSport(sport: string): void {
    if (this.sports.includes(sport)) {
      this.sports = this.sports.filter(item => item !== sport);
    } else {
      this.sports = [...this.sports, sport];
    }

    this.sportsError = false;
  }

  isSportSelected(sport: string): boolean {
    return this.sports.includes(sport);
  }

  // Recherche d'adresses avec l'API de géocodage
  searchAddress(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.location = input.value;
    this.selectedAddress = null;
    this.addressSuggestions = [];
    this.addressError = '';

    if (this.location.trim().length < 3) {
      this.addressLoading = false;
      return;
    }

    this.addressLoading = true;

    this.http.get<any>(
      'https://data.geopf.fr/geocodage/search',
      {
        params: {
          q: this.location,
          limit: '5'
        }
      }
    ).subscribe({
      next: response => {
        this.addressSuggestions = (response.features ?? [])
          .map((feature: any) => ({
            label: feature.properties?.label,
            coordinates: feature.geometry?.coordinates
          }))
          .filter((address: AddressSuggestion) =>
            typeof address.label === 'string' &&
            Array.isArray(address.coordinates)
          );

        this.addressLoading = false;
      },
      error: () => {
        this.addressSuggestions = [];
        this.addressLoading = false;
        this.addressError =
          'Impossible de rechercher les adresses. Réessaie plus tard.';
      }
    });
  }

  chooseAddress(address: AddressSuggestion): void {
    this.selectedAddress = address;
    this.location = address.label;
    this.addressSuggestions = [];
    this.addressError = '';
  }

  // Navigation
  nextStep(): void {
    if (this.currentStep === 1) {
      if (!this.gender) {
        this.genderError = true;
        return;
      }
    }

    if (this.currentStep === 2) {
      if (this.sports.length === 0) {
        this.sportsError = true;
        return;
      }
    }

    if (this.currentStep === 3) {
      if (!this.selectedAddress) {
        this.addressError =
          'Choisis une adresse parmi les suggestions pour continuer.';
        return;
      }
    }

    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Champs facultatifs
  onDescriptionInput(event: Event): void {
    this.description = (event.target as HTMLTextAreaElement).value;
  }

  onPhoneInput(event: Event): void {
    this.phone = (event.target as HTMLInputElement).value;
  }

  // Photo facultative
  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    this.photoError = '';

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.photoError = 'Veuillez sélectionner un fichier image.';
      input.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.photoError = 'La photo ne doit pas dépasser 5 Mo.';
      input.value = '';
      return;
    }

    if (this.photoPreview) {
      URL.revokeObjectURL(this.photoPreview);
    }

    this.photoFile = file;
    this.photoPreview = URL.createObjectURL(file);
  }

  removePhoto(): void {
    if (this.photoPreview) {
      URL.revokeObjectURL(this.photoPreview);
    }

    this.photoPreview = null;
    this.photoFile = null;
    this.photoError = '';
  }

  // Fin de l'onboarding
  finishOnboarding(): void {
    const profile = {
      gender: this.gender,
      sports: this.sports,
      location: this.selectedAddress?.label ?? '',
      coordinates: this.selectedAddress?.coordinates ?? null,
      description: this.description,
      phone: this.phone,
      photo: this.photoFile
    };

    // Pour le moment, les données sont affichées dans la console.
    // Il faudra ensuite les envoyer à ton backend Spring Boot.
    console.log('Profil à enregistrer :', profile);

    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.photoPreview) {
      URL.revokeObjectURL(this.photoPreview);
    }
  }
}