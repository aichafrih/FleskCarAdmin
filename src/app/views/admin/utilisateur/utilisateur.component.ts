import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  users: User[] = [];
  searchKey: string = '';
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
        },
        (error) => {
          console.error('Error searching users:', error);
        }
      );
    } else {
      console.error('Missing token or empty search key');
    }
  }



 
}




