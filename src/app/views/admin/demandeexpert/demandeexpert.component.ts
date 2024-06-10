import { Component, OnInit } from '@angular/core';
import { ExpertRequest } from 'src/app/ExpertRequest.model';
import { AdminService } from 'src/app/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demandeexpert',
  templateUrl: './demandeexpert.component.html',
  styleUrls: ['./demandeexpert.component.scss']
})
export class DemandeexpertComponent implements OnInit {

  expertRequests: ExpertRequest[] = [];

  constructor(private apiService: AdminService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) { // Vérifiez si le jeton est défini et non null
      this.apiService.getAllExpertRequests(token).subscribe(
        (data: ExpertRequest[]) => {
          this.expertRequests = data;
          console.log(Response);
        },
        error => {
          console.log('Erreur lors de la récupération des demandes d\'expert : ', error);
        }
      );
    } else {
      console.log('Le jeton d\'authentification est null. Assurez-vous qu\'il est correctement défini.');
    }
  }



  
  confirmRequest(ider: number): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.confirmRequest(ider, token).subscribe(
        response => {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'La demande a été confirmée avec succès.',
              timer: 1500, // 3 secondes
              timerProgressBar: true,
              showConfirmButton: false
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Échec',
              text: 'Échec de la confirmation de la demande.',
              timer: 1500, // 3 secondes
              timerProgressBar: true,
              showConfirmButton: false
            });
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de la confirmation de la demande : ' + error.message,
            timer: 1500, // 3 secondes
            timerProgressBar: true,
            showConfirmButton: false
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Le jeton d\'authentification est null. Assurez-vous qu\'il est correctement défini.',
        timer: 1500, // 3 secondes
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  }

  refuseRequest(ider: number): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.refuseRequest(ider, token).subscribe(
        response => {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'La demande a été refusée avec succès.',
              timer: 1500, // 3 secondes
              timerProgressBar: true,
              showConfirmButton: false
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Échec',
              text: 'Échec du refus de la demande.',
              timer: 1500, // 3 secondes
              timerProgressBar: true,
              showConfirmButton: false
            });
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors du refus de la demande : ' + error.message,
            timer: 1500, // 3 secondes
            timerProgressBar: true,
            showConfirmButton: false
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Le jeton d\'authentification est null. Assurez-vous qu\'il est correctement défini.',
        timer: 1500, // 3 secondes
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  }
}