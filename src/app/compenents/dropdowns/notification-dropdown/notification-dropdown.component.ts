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