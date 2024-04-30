import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.scss']
})
export class HeaderStatsComponent implements OnInit {

  totalUsers!: number;
  totalPublications!: number;

  constructor(private adminService: UserService) { }

  ngOnInit(): void {
    this.loadAdminDashboard();
  }

  loadAdminDashboard(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.adminService.getAdminDashboard().subscribe( // Supprimez l'argument token ici
        (data) => {
          this.totalUsers = data.totalUsers;
          this.totalPublications = data.totalPublications;
        },
        (error) => {
          console.error('Error fetching admin dashboard data:', error);
        }
      );
    } else {
      console.error('Token not found in localStorage.');
    }
  }
}