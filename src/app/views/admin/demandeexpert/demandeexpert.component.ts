import { Component, OnInit } from '@angular/core';
import { ExpertRequest } from 'src/app/ExpertRequest.model';
import { AdminService } from 'src/app/admin.service';

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
            console.log('La demande a été confirmée avec succès.');
            // Effectuez les actions supplémentaires si nécessaire
          } else {
            console.log('Échec de la confirmation de la demande.');
            // Gérez les cas d'échec si nécessaire
          }
        },
        error => {
          console.error('Erreur lors de la confirmation de la demande : ', error);
          // Gérez les erreurs si nécessaire
        }
      );
    } else {
      console.log('Le jeton d\'authentification est null. Assurez-vous qu\'il est correctement défini.');
    }
  }

  refuseRequest(ider: number): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.refuseRequest(ider, token).subscribe(
        response => {
          if (response.success) {
            console.log('La demande a été refusée avec succès.');
            // Effectuez les actions supplémentaires si nécessaire
          } else {
            console.log('Échec du refus de la demande.');
            // Gérez les cas d'échec si nécessaire
          }
        },
        error => {
          console.error('Erreur lors du refus de la demande : ', error);
          // Gérez les erreurs si nécessaire
        }
      );
    } else {
      console.log('Le jeton d\'authentification est null. Assurez-vous qu\'il est correctement défini.');
    }
  }
}