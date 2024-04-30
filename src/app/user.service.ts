import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'; // Définissez le modèle User selon la structure de vos données côté serveur

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/admin/'; // Remplacez cela par l'URL de votre backend NestJS

  constructor(private http: HttpClient) { }

  private authToken: string | undefined;

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
    return this.http.get<any>(`${this.apiUrl}ListeUsers`, { headers });
  }

  searchUsers(key: string, authToken: string): Observable<User[]> {
    const url = `${this.apiUrl}search-users?key=${key}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get<User[]>(url, { headers });
  }



  getAdminDashboard(): Observable<any> {
    // Définissez vos en-têtes personnalisés ici
    const headers = new HttpHeaders({
      'Authorization': 'Bearer VOTRE_TOKEN_JWT',
      'Content-Type': 'application/json'
      // Ajoutez d'autres en-têtes si nécessaire
    });

    // Utilisez les en-têtes dans la requête
    return this.http.get<any>('http://localhost:3000/admin/dashboard', { headers: headers });
  }
}
