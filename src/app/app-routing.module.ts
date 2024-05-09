import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';

import { SettingsComponent } from './views/admin/settings/settings.component';
import { TablesComponent } from './views/admin/tables/tables.component';
import { MapsComponent } from './views/admin/maps/maps.component';
import { DashAdminComponent } from './layout/dash-admin/dash-admin.component';
import { UtilisateurComponent } from './views/admin/utilisateur/utilisateur.component';
import { ExpertsComponent } from './views/admin/experts/experts.component';
import { DemandeexpertComponent } from './views/admin/demandeexpert/demandeexpert.component';
import { AnnoncesComponent } from './views/admin/annonces/annonces.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
   // Auth views
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Admin views
  {
    path: 'admin',
    component: DashAdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'Utilisateurs', component: UtilisateurComponent },
      { path: 'Experts', component: ExpertsComponent },
      { path: 'DemandeExpert', component: DemandeexpertComponent },
      { path: 'Annonces', component: AnnoncesComponent },
      { path: 'maps', component: MapsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
