import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const adminId = localStorage.getItem('adminId');
    

    if (token && adminId) {
        // L'utilisateur est authentifié et l'ID de l'utilisateur est présent dans le stockage local
        return true;
    } else {
        // L'utilisateur n'est pas authentifié ou l'ID de l'utilisateur est manquant dans le stockage local
        // Redirigez-le vers la page de connexion
        this.router.navigate(['/login']);
        return false;
    }
  }
}