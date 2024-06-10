import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './user.model'; // Définissez le modèle User selon la structure de vos données côté serveur
import { Expert } from './Expert.model';

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


  searchExperts(key: string, authToken: string): Observable<Expert[]> {
    const url = `${this.apiUrl}search-experts?key=${key}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Expert[]>(url, { headers });
  }



  getAdminDashboard(): Observable<any> {
    // Définissez vos en-têtes personnalisés ici
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
      // Ajoutez d'autres en-têtes si nécessaire
    });

    // Utilisez les en-têtes dans la requête
    return this.http.get<any>('http://localhost:3000/admin/dashboard', { headers: headers });
  }

  getProfileImage(ExpertId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/expert/profile-image/${ExpertId}`, { responseType: 'blob' });
  }




  
  blockUser(userId: number, token: string): Observable<any> {
    const url = `http://localhost:3000/admin/block-user/${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, {}, { headers });
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/admin/users/${userId}`);
  }

  unblockUser(userId: number): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/admin/unblock/${userId}`, {});
  }


  blockExpert(expertId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Token not found in localStorage');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}block-expert/${expertId}`, {}, { headers }).pipe(
      catchError((error: any) => {
        return throwError('Error blocking user: ' + error.message);
      })
    );
  }
  getBlockedExperts(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}blocked-experts`, { headers });
  }
  unblockExpert(ide: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch<any>(`${this.apiUrl}unblock-expert/${ide}`, {}, { headers });
  }

}
