import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { AdminService } from "src/app/admin.service";
import { Notification } from '../../../notification.model';
import { HttpErrorResponse } from "@angular/common/http";



@Component({
  selector: "app-notification-dropdown",
  templateUrl: "./notification-dropdown.component.html",
})
export class NotificationDropdownComponent implements OnInit{
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;

  toggleDropdown(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }
  createPoppper() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }

 notifications: Notification[] = [];
 error: string = '';
  constructor(private notificationService: AdminService) { }


  
  extractNames(content: string): string[] {
    // Créer un tableau pour stocker les noms extraits
    const names: string[] = [];

    // Rechercher le mot après "firstName"
    const firstNameIndex = content.indexOf('firstName');
    if (firstNameIndex !== -1) {
      const firstNameEndIndex = content.indexOf(',', firstNameIndex);
      if (firstNameEndIndex !== -1) {
        let firstName = content.substring(firstNameIndex + 11, firstNameEndIndex); // 11 est la longueur de "firstName: "
        // Supprimer les guillemets doubles si présents
        firstName = firstName.replace(/"/g, '');
        names.push(firstName.trim());
      }
    }

    // Rechercher le mot après "lastName"
    const lastNameIndex = content.indexOf('lastName');
    if (lastNameIndex !== -1) {
      const lastNameEndIndex = content.indexOf(',', lastNameIndex);
      if (lastNameEndIndex !== -1) {
        let lastName = content.substring(lastNameIndex + 10, lastNameEndIndex); // 10 est la longueur de "lastName: "
        // Supprimer les guillemets doubles si présents
        lastName = lastName.replace(/"/g, '');
        names.push(lastName.trim());
      }
    }

    return names;
  }







  ngOnInit(): void {
    this.fetchNotifications(); // Appel de la fonction pour récupérer les notifications
  }

  // Fonction pour récupérer les notifications
  fetchNotifications(): void {
    const token = localStorage.getItem('token');
  
    if (!token) {
      this.error = 'Le token d\'authentification est manquant.';
      return;
    }
  
    // Appel du service de notification pour récupérer les notifications
    this.notificationService.getAdminNotifications(token)
      .subscribe(
        (notifications: Notification[]) => {
          // Traitement des notifications reçues
          this.notifications = notifications;
        },
        (error: HttpErrorResponse) => {
          // Gestion des erreurs
          if (error.status === 403) {
            this.error = 'Accès interdit. Vérifiez vos autorisations.';
          } else if (error.status === 401) {
            this.error = 'Non autorisé. Veuillez vous connecter à nouveau.';
          } else {
            this.error = 'Une erreur inattendue s\'est produite lors de la récupération des notifications.';
          }
          console.error('Erreur de récupération des notifications :', error);
        }
      );
  }
  
}  