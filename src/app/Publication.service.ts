import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Publication } from './Publication.model';
import { PubFilterDto } from './PubFilterDto.model';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private url = 'http://localhost:3000/pubs/'; // Remplacez cela par l'URL de votre API

  constructor(private http: HttpClient) {}

  getAllPublications(): Observable<Publication[]> {
    const url = `${this.url}`; // Endpoint pour récupérer toutes les publications
    return this.http.get<Publication[]>(url);
  }

  

  getPublicationImages(publicationId: number): Observable<any> {
    return this.http.get<any>(`${this.url}${publicationId}/images`);
  }

  getAllBoiteVitesse(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}boiteVitesse`);
  }
 


  searchPublications(filterDto: PubFilterDto): Observable<Publication[]> {
    let params = new HttpParams();
    
    // Ajoutez les paramètres de requête en fonction de vos besoins
    if (filterDto.marque) params = params.set('marque', filterDto.marque);
    if (filterDto.model) params = params.set('model', filterDto.model);
    if (filterDto.anneeMin) params = params.set('anneeMin', filterDto.anneeMin.toString());
    if (filterDto.anneeMax) params = params.set('anneeMax', filterDto.anneeMax.toString());
    if (filterDto.nombrePlace) params = params.set('nombrePlace', filterDto.nombrePlace.toString());
    if (filterDto.kilometrageMin) params = params.set('kilometrageMin', filterDto.kilometrageMin.toString());
    if (filterDto.kilometrageMax) params = params.set('kilometrageMax', filterDto.kilometrageMax.toString());
    if (filterDto.prixMin) params = params.set('prixMin', filterDto.prixMin.toString());
    if (filterDto.prixMax) params = params.set('prixMax', filterDto.prixMax.toString());
    if (filterDto.typeCarburant != null) params = params.set('typeCarburant', filterDto.typeCarburant);
    if (filterDto.couleur != null) params = params.set('couleur', filterDto.couleur);
    if (filterDto.city) params = params.set('city', filterDto.city);
    if (filterDto.boiteVitesse) params = params.set('boiteVitesse', filterDto.boiteVitesse);
    // Ajoutez d'autres paramètres de la même manière
    
    return this.http.get<Publication[]>(`${this.url}search`, { params });
  }















  filterPublications(filterDto: any): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.url}filtrer`, { params: filterDto });
  }

  getAllMarques(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}marques`);
  }
  getAllCity(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}City`);
  }

  getAllModels(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}models`);
  }

  getAllColors(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}couleurs`);
  }

  getAllFuelTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}TypesCarburant`);
  }


  deletePub(pubId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`http://localhost:3000/admin/delete/${pubId}`, { headers });
  }
}










  
