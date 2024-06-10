import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  demandes: any[] = [];
  token: string | null = '';

  constructor(private adminService: AdminService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.affiche();
   
  }
  affiche(){
    if (this.token) {
      this.adminService.getDemandes(this.token).subscribe(
        (data) => {
          this.demandes = data;
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    } else {
      console.error('No token found in localStorage');
    }
  }
  deleteMessage(id: number) {
    const token = localStorage.getItem('token'); // Vous devez récupérer le token d'où vous le stockez
    
    if (token) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas revenir en arrière!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFA800',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminService.deleteCreationCompteRequest(id, token).subscribe(
            () => {
              Swal.fire(
                'Supprimé!',
                'Le message a été supprimé.',
                'success'
              );
              // Faites quelque chose après la suppression réussie si nécessaire
              this.affiche();
            },
            error => {
              Swal.fire(
                'Erreur!',
                'Il y a eu un problème lors de la suppression du message.',
                'error'
              );
            }
          );
        }
      });
    } else {
      Swal.fire(
        'Erreur!',
        'Token non trouvé. Veuillez vous reconnecter.',
        'error'
      );
    }
  }


}