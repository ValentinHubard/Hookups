
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Sport } from '../models/sport';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/sports';

  getAllSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.apiUrl);
  }
}