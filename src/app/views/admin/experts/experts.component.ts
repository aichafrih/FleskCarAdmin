import { Component, OnInit } from '@angular/core';
import { Expert } from 'src/app/Expert.model';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent implements OnInit {

  experts: Expert[] = [];
  token!: string | null;

  constructor(private adminService: AdminService) {}

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
}