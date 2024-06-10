import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientbloquer',
  templateUrl: './clientbloquer.component.html',
  styleUrls: ['./clientbloquer.component.scss']
})
export class ClientbloquerComponent implements OnInit {

  blockedUsers: any[] = [];

  constructor(private http: HttpClient,private userService: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loadBlockedUsers(token);
    } else {
      console.error('Token not found in localStorage');
    }
  }

  loadBlockedUsers(token: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:3000/admin/blocked-users', { headers }).subscribe(
      (data: any[]) => {
        this.blockedUsers = data;
        console.log('Blocked Users:', this.blockedUsers);
      },
      (error) => {
        console.error('Error fetching blocked users:', error);
      }
    );
  }

  unblockUser(userId: number) {
    this.userService.unblockUser(userId).subscribe(
      response => {
        console.log('User unblocked successfully:', response);
        this.loadBlockedUsers(localStorage.getItem('token') || '');
        // Afficher une alerte SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Utilisateur débloqué!',
          text: 'L\'utilisateur a été débloqué avec succès.',
          confirmButtonText: 'OK'
        });
        // Mettre à jour la liste des utilisateurs bloqués ou faire d'autres actions nécessaires
      },
      error => {
        console.error('Error unblocking user:', error);
        // Afficher une alerte SweetAlert en cas d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors du déblocage de l\'utilisateur.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
