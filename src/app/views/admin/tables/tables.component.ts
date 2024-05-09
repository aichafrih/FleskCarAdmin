import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AdminService } from 'src/app/admin.service';
import { CreateSubscription } from 'src/app/create-subscription.model';


@Component({
  selector: 'app-tables', 
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
ids!: Subscription;

  constructor(private adminService: AdminService,private fb: FormBuilder) { }



  isFormVisible: boolean = false;

  showForm() {
    this.isFormVisible = true;
  }


  createSubscriptionDto: CreateSubscription = {
    ids: 0,
    name: '',
    duration: 0,
    price: 0,
    description: ''
  };
  authToken: string = localStorage.getItem('token') || ''; // Récupère le jeton d'authentification depuis le localStorage

 

  createSubscription() {
    this.adminService.createSubscription(this.createSubscriptionDto, this.authToken).subscribe(
      response => {
        console.log(response); // Gérez la réponse de manière appropriée
      },
      error => {
        console.error(error); // Gérez les erreurs de manière appropriée
      }
    );
  }

  subscriptions: Partial<CreateSubscription>[] = [];
getallabonnement(){ 
  const token = localStorage.getItem('token'); // Remplacez VOTRE_TOKEN par votre token d'authentification
  if (token !== null) { // Vérifiez que le token n'est pas null avant de l'utiliser
    this.adminService.getAllSubscriptions(token)
      .subscribe(
        (subscriptions) => {
          this.subscriptions = subscriptions;
        },
        (error) => {
          console.error('Une erreur s\'est produite :', error);
        }
      );
  } else {
    console.error('Le token est null.');
  }
}

subscriptionForm!: FormGroup;
subscriptionData: any;

ngOnInit(): void {
  this.subscriptionForm = this.fb.group({
    name: [''],
    duration: [0],
    price: [0],
    description: ['']
  });
  
  this.getallabonnement()
 
}



showPopup = false;
openPopup() {
  this.showPopup = true;
}

// Méthode pour fermer la popup
closePopup() {
  this.showPopup = false;
}



selectedSubscription: CreateSubscription | undefined;

editSubscription(id: number) {
  this.adminService.getSubscriptionById(id)
    .subscribe(
      (subscription: CreateSubscription) => {
        this.selectedSubscription = subscription;
        if (this.selectedSubscription) {
          this.subscriptionForm.patchValue({
            name: subscription.name,
            duration: subscription.duration,
            price: subscription.price,
            description: subscription.description
          });
        }
      },
      (error) => {
        console.error('Error fetching subscription:', error);
      }
    );
}


updateSubscription() {
  const id = this.selectedSubscription?.ids || 0;
  const updatedSubscription = this.subscriptionForm.value as CreateSubscription;
  this.adminService.updateSubscription(id, updatedSubscription)
    .subscribe(
      (response) => {
        console.log('Subscription updated:', response);
        this.closePopup();
        // Mettez à jour la liste des abonnements ou effectuez d'autres actions nécessaires
        this.getallabonnement(); // Mettez à jour la liste après la modification
        this.selectedSubscription = undefined; // Effacez la souscription sélectionnée
      },
      (error) => {
        console.error('Error updating subscription:', error);
      }
    );
}

deleteSubscription(ids: number): void {
  this.adminService.deleteSubscription(ids).subscribe(
    () => {
      console.log('Abonnement supprimé avec succès');
      this.getallabonnement();
      // Mettre à jour la liste des abonnements ou effectuer d'autres actions après la suppression réussie
    },
    (error) => {
      console.error('Erreur lors de la suppression de l\'abonnement : ', error);
      // Gérer l'erreur comme vous le souhaitez
    }
  );
}
}


