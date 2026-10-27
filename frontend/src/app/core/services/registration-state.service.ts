import { Injectable } from '@angular/core';

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationStateService {
  private registrationData: RegistrationData | null = null;

  setData(data: RegistrationData): void {
    this.registrationData = data;
  }

  getData(): RegistrationData | null {
    return this.registrationData;
  }

  clearData(): void {
    this.registrationData = null;
  }
}