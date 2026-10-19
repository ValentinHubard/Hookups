import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { RegisterComponent } from './features/auth/register/register';
import { OnboardingComponent } from './features/auth/onboarding/onboarding';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'register', component: RegisterComponent},
    { path: 'onboarding', component: OnboardingComponent}
];
