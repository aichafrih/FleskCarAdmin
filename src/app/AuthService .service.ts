import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setAdminId(id: any) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://localhost:3000/'; // Mettez votre URL de backend ici

  constructor(private http: HttpClient) { }

  
  connexion(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'auth/connexionAdmin', { email, MotDePasse: password });
  }

}
