import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expertbloquer',
  templateUrl: './expertbloquer.component.html',
  styleUrls: ['./expertbloquer.component.scss']
})
export class ExpertbloquerComponent implements OnInit {


  blockedExperts: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loadBlockedExperts(token);
    } else {
      console.error('Token not found in localStorage');
    }
  }

  loadBlockedExperts(token: string): void {
    this.userService.getBlockedExperts(token).subscribe(
      (data: any[]) => {
        this.blockedExperts = data;
        console.log('Blocked Experts:', this.blockedExperts);
      },
      (error) => {
        console.error('Error fetching blocked experts:', error);
      }
    );
  }

  unblockExpert(expertId: number): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.unblockExpert(expertId, token).subscribe(
        response => {
          console.log('Expert unblocked successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Expert débloqué!',
            text: 'L\'expert a été débloqué avec succès.',
            confirmButtonText: 'OK'
          });
          this.loadBlockedExperts(token); // Mettre à jour la liste des experts bloqués
        },
        error => {
          console.error('Error unblocking expert:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors du déblocage de l\'expert.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.error('Token not found in localStorage');
    }
  }



}