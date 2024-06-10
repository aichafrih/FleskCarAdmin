import { Component, OnInit } from '@angular/core';
import { Expert } from 'src/app/Expert.model';
import { AdminService } from 'src/app/admin.service';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent implements OnInit {

  experts: Expert[] = [];
  token!: string | null;
  searchKey: string = '';

  constructor(private adminService: AdminService,private userService: UserService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.adminService.getAllExperts(this.token).subscribe(
        (experts: Expert[]) => {
          this.experts = experts;
        },
        (error) => {
          console.error('Erreur lors de la récupération des experts : ', error);
        }
      );
    } else {
      console.log('Le jeton d\'authentification est null. Assurez-vous qu\'il est correctement défini.');
    }
  }

  getExpertById(ide: number): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.adminService.getExpertById(ide, this.token).subscribe(
        (expert: Expert) => {
          console.log('Expert récupéré : ', expert);
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'expert : ', error);
        }
      );
    } else {
      console.log('Le jeton d\'authentification est null. Assurez-vous qu\'il est correctement défini.');
    }
  }

  searchExperts(): void {
    const token = localStorage.getItem('token');
    if (token && this.searchKey.trim() !== '') {
      this.userService.searchExperts(this.searchKey, token).subscribe(
        (data: Expert[]) => {
          this.experts = data;
        },
        (error) => {
          console.error('Error searching users:', error);
        }
      );
    } else {
      console.error('Missing token or empty search key');
    }
  }


  blockExpert(expertId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment bloquer cet expert ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, bloquer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.blockExpert(expertId).subscribe(
          (response: any) => {
            console.log('Expert bloqué avec succès :', response);
            Swal.fire({
              icon: 'success',
              title: 'Expert bloqué!',
              text: 'L\'expert a été bloqué avec succès.',
              confirmButtonText: 'OK'
            });
            // Mettre à jour la liste des utilisateurs bloqués ou faire d'autres actions nécessaires
          },
          (error: any) => {
            console.error('Erreur lors du blocage de l\'expert :', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur s\'est produite lors du blocage de l\'expert.',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
}

