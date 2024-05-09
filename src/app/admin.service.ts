import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Notification } from './notification.model';
import { CreateSubscription } from './create-subscription.model';
import { ExpertRequest } from './ExpertRequest.model';
import { Expert } from './Expert.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getAdminNotifications(token: string): Observable<Notification[]> {
    // Ajoutez le token d'authentification dans les headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Utilisez le token passé en paramètre
      'Content-Type': 'application/json'
      // Ajoutez d'autres en-têtes si nécessaire
    });

    return this.http.get<Notification[]>('http://localhost:3000/admin/notifications', { headers });
  }
  
  createSubscription(createSubscriptionDto: CreateSubscription, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>('http://localhost:3000/admin/subscription', createSubscriptionDto, { headers });
  }

  getAllSubscriptions(token: string): Observable<Partial<CreateSubscription>[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Partial<CreateSubscription>[]>(`http://localhost:3000/admin/subscriptions`, { headers });
  }



  getSubscriptionById(id: number): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
        // Ajoutez d'autres en-têtes si nécessaire
      });
    return this.http.get(`http://localhost:3000/admin/subscription/${id}`, { headers });
  }

  updateSubscription(id: number, updateSubscriptionDto: CreateSubscription): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
      // Ajoutez d'autres en-têtes si nécessaire
    });
    return this.http.put(`http://localhost:3000/admin/updateSub/${id}`, updateSubscriptionDto, { headers });
  }

  deleteSubscription(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
      // Ajoutez d'autres en-têtes si nécessaire
    });

    // Envoi de la requête DELETE avec les en-têtes
    return this.http.delete(`http://localhost:3000/admin/deleteSub/${id}`, { headers: headers });
  }




  getAllExpertRequests(token: string): Observable<ExpertRequest[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoutez votre jeton d'authentification
    });

    return this.http.get<ExpertRequest[]>(`http://localhost:3000/admin/expert-requests`, { headers });
  }

  getExpertRequestById(id: number, token: string): Observable<ExpertRequest> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoutez votre jeton d'authentification
    });

    return this.http.get<ExpertRequest>(`http://localhost:3000/admin/expert-request/${id}`, { headers });
  }
  confirmRequest(id: number, token: string): Observable<{ success: boolean }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoutez votre jeton d'authentification
    });

    return this.http.post<{ success: boolean }>(`http://localhost:3000/admin/${id}/confirm`, {}, { headers });
  }

  refuseRequest(id: number, token: string): Observable<{ success: boolean }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoutez votre jeton d'authentification
    });

    return this.http.post<{ success: boolean }>(`http://localhost:3000/admin/${id}/refuse`, {}, { headers });
  }

  getAllExperts(token: string): Observable<Expert[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Expert[]>(`http://localhost:3000/admin/experts`, { headers: headers });
  }

  getExpertById(id: number, token: string): Observable<Expert> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Expert>(`http://localhost:3000/admin/experts/${id}`, { headers: headers });
  }
}





