import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user.model';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  users: User[] = [];
  searchKey: string = '';
  userId: number | undefined; 
  user: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.setAuthToken(token);
      this.loadUsers();
      this.searchUsers();
    } else {
      console.error('Token not found in localStorage');
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        if (this.users.length > 0) {
          this.userId = this.users[0].id as number; // Convertir en nombre
          this.loadUserById(this.userId);
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  searchUsers(): void {
    const token = localStorage.getItem('token');
    if (token && this.searchKey.trim() !== '') {
      this.userService.searchUsers(this.searchKey, token).subscribe(
        (data: User[]) => {
          this.users = data;
          if (this.users.length > 0) {
            this.userId = this.users[0].id as number; // Convertir en nombre
            this.loadUserById(this.userId);
          }
        },
        (error) => {
          console.error('Error searching users:', error);
        }
      );
    } else {
      this. loadUsers();
    }
  }

  loadUserById(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (user: User) => {
        this.user = user;
        console.log('User:', this.user);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
  


  blockUser(userId: number) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir bloquer cet utilisateur?',
      text: 'Une fois bloqué, cet utilisateur ne pourra plus accéder à votre site.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, bloquer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        if (token) {
          this.userService.blockUser(userId, token).subscribe(
            response => {
              console.log('User blocked successfully:', response);
              // Afficher une alerte de succès
              Swal.fire({
                icon: 'success',
                title: 'Utilisateur bloqué avec succès!',
                showConfirmButton: false,
                timer: 1500 // Fermer l'alerte après 1.5 secondes
              });
            },
            error => {
              console.error('Error blocking user:', error);
              // Afficher une alerte d'erreur
              Swal.fire({
                icon: 'error',
                title: 'Erreur lors du blocage de l\'utilisateur',
                text: 'Veuillez réessayer.',
              });
            }
          );
        } else {
          console.error('No token found, user cannot be blocked.');
        }
      }
    });
  }
}