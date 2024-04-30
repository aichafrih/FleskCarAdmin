import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  
  login() {
    throw new Error('Method not implemented.');
    
  }
  private readonly TOKEN_KEY = 'auth_token'; // Clé pour stocker le token dans le stockage local

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }



  private connectedadminId: string | null = null;

  // Méthode pour stocker l'ID de l'utilisateur connecté
  setadminId(adminId: string): void {
    this.connectedadminId = adminId;
  }

  // Méthode pour récupérer l'ID de l'utilisateur connecté
  getadminId(): string | null {
    return this.connectedadminId;
  }
  

 
  }