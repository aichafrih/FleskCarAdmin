import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  profileImage: string | ArrayBuffer | null = null;
  ngOnInit(): void {
    const adminId = 1; // Remplacez par l'ID de l'admin concerné
    this.adminService.getProfileImage(adminId).subscribe(
      (response) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImage = reader.result;
        };
        reader.readAsDataURL(response);
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'image de profil', error);
      }
    );
  }
  
  

  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Récupérez le token d'authentification depuis le localStorage
      const token = localStorage.getItem('token');
  
      if (token) {
        this.adminService.updateProfileImage(file, token).subscribe(
          (response) => {
            console.log('Image mise à jour avec succès', response);
            // Ajoutez ici la logique pour mettre à jour l'image de profil dans votre composant
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'image de profil', error);
          }
        );
      } else {
        console.error('Aucun token trouvé dans le localStorage.');
      }
    }
  }
  

  email: string = '';
  MotDePasse: string = '';
  updateAccount() {
    const token = localStorage.getItem('token'); // Récupérez le jeton d'authentification depuis votre service d'authentification
    if (token) {
      this.adminService.updateAccount(this.email, this.MotDePasse, token).subscribe(
        response => {
          console.log('Réponse du serveur :', response);
          // Faire quelque chose avec la réponse
        },
        error => {
          console.error('Erreur lors de la mise à jour du compte :', error);
          // Gérer l'erreur
        }
      );
    }
  }

}

