import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PubFilterDto } from 'src/app/PubFilterDto.model';
import { Publication } from 'src/app/Publication.model';
import { PublicationService } from 'src/app/Publication.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {

  imageSubscriptions: Subscription[] = [];
  publications: Publication[] = [];

  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    
    this.getAllPublications();
    this.getAllModels();
    this.getAllMarques();
    this.getAllCouleurs();
    this.getAllFuelTypes();
  }

  getAllPublications(): void {
    this.publicationService.getAllPublications().subscribe(
      (publications: Publication[]) => {
        this.publications = publications;
        console.log('Publications chargées avec succès :', this.publications);

        this.publications.forEach((publication: Publication) => {
          const subscription = this.getPublicationImages(publication.pubid).subscribe(
            (response: any) => {
              if (response.data) {
                const publicationImages = response.data.map((image: any) => {
                  return { imageSrc: image.path, imageAlt: 'Image' };
                });
                publication.images = publicationImages; // Ajouter les images de la publication à la liste globale des images
              } else {
                console.error('Aucune donnée d\'image reçue pour la publication ID', publication.pubid);
              }
            },
            (error: any) => {
              console.error('Erreur lors du chargement des images pour la publication ID', publication.pubid, ': ', error);
            }
          );
          this.imageSubscriptions.push(subscription);
        });
      },
      (error: any) => {
        console.error('Erreur lors du chargement des publications :', error);
      }
    );
  }
  getPublicationImages(publicationId: number): Observable<any> {
    return this.publicationService.getPublicationImages(publicationId);   
  }



  models$!: Observable<string[]>; 
  marques$!: Observable<string[]>;
  couleurs$!: Observable<string[]>;
  fuelTypes$!: Observable<string[]>;

  getAllModels(): void {
    this.models$ = this.publicationService.getAllModels(); // Pas besoin de await ici
  }
  getAllMarques(): void {
    this.marques$ = this.publicationService.getAllMarques();
  }
  getAllCouleurs(): void {
    this.couleurs$ = this.publicationService.getAllColors();
  }
  getAllFuelTypes(): void {
    this.fuelTypes$ = this.publicationService.getAllFuelTypes();
  }


  

  filterDto: PubFilterDto = {} as PubFilterDto;
searchPublications(): void {
  this.publicationService.searchPublications(this.filterDto).subscribe(
    (publications: Publication[]) => {
      this.publications = publications;

      // Charger les images pour les nouvelles publications
      this.loadImagesForPublications();
    },
    (error) => {
      console.error('Une erreur est survenue : ', error);
    }
  );
}


loadImagesForPublications(): void {
  // Annuler les abonnements précédents pour éviter les fuites de mémoire
  this.imageSubscriptions.forEach(subscription => subscription.unsubscribe());
  this.imageSubscriptions = [];

  // Charger les images pour chaque nouvelle publication
  this.publications.forEach((publication: Publication) => {
    const subscription = this.getPublicationImages(publication.pubid).subscribe(
      (response: any) => {
        if (response.data) {
          const publicationImages = response.data.map((image: any) => {
            return { imageSrc: image.path, imageAlt: 'Image' };
          });
          publication.images = publicationImages;
        } else {
          console.error('Aucune donnée d\'image reçue pour la publication ID', publication.pubid);
        }
      },
      (error: any) => {
        console.error('Erreur lors du chargement des images pour la publication ID', publication.pubid, ': ', error);
      }
    );
    this.imageSubscriptions.push(subscription);
  });
}

}