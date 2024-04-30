import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/AuthService .service';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


 
  email: string = '';
  password: string = '';
  error = '';
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private authServiceS: AuthServiceService,
  ) { }

  ngOnInit(): void {
   
  }

  connexion() {
    this.auth.connexion(this.email, this.password).subscribe(
      response => {
        // Stocker le token JWT dans le stockage local ou dans un cookie
       
        console.log('Connexion réussie !', response);
        localStorage.setItem('token', response.token);
        // Vérifier si l'identifiant de l'administrateur est défini dans la réponse
        if (response.admin && response.admin.ida) {
          // Stocker l'identifiant de l'administrateur dans le service d'authentification
          this.authServiceS.setadminId(response.admin.ida);
          localStorage.setItem('token', response.token);
          // Rediriger l'utilisateur vers la page d'administration avec l'identifiant de l'administrateur
          this.router.navigate(['/admin']);
        } else {
          console.error('Identifiant de l\'utilisateur non défini dans la réponse du backend.');
          // Gérer l'erreur, par exemple afficher un message à l'utilisateur
          this.error = 'Identifiant de l\'utilisateur non défini dans la réponse du backend.';
        }
      },
      error => {
        console.error('Erreur lors de la connexion :', error);
        this.error = error.error.message || 'Une erreur s\'est produite lors de la connexion.';
      }
    );
  }
}