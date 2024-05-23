import { Component, OnInit } from '@angular/core';
import { Expert } from 'src/app/Expert.model';
import { AdminService } from 'src/app/admin.service';
import { UserService } from 'src/app/user.service';

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

  getExpertById(id: number): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.adminService.getExpertById(id, this.token).subscribe(
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
}