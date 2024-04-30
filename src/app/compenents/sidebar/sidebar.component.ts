import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  collapseShow = "hidden";
  constructor( private router: Router,
    private authService: AuthServiceService,) {}

  ngOnInit() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }


  logout(): void {
    this.authService.logout(); // Appel à la méthode de déconnexion du service d'authentification
    console.log("admin déconnecter")
    this.router.navigate(['/login']); // Redirection vers la page d'accueil après la connexion
  }
}
