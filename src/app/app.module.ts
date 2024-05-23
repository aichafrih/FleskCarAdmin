import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationDropdownComponent } from './compenents/dropdowns/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from './compenents/dropdowns/user-dropdown/user-dropdown.component';
import { AnnoncesComponent } from './views/admin/annonces/annonces.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { DemandeexpertComponent } from './views/admin/demandeexpert/demandeexpert.component';
import { UtilisateurComponent } from './views/admin/utilisateur/utilisateur.component';
import { LoginComponent } from './views/login/login.component';

import { SidebarComponent } from './compenents/sidebar/sidebar.component';
import { AdminNavbarComponent } from './compenents/admin-navbar/admin-navbar.component';
import { HeaderStatsComponent } from './compenents/header-stats/header-stats.component';
import { FooterAdminComponent } from './compenents/footer-admin/footer-admin.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { TablesComponent } from './views/admin/tables/tables.component';
import { MapsComponent } from './views/admin/maps/maps.component';

import { ProfileComponent } from './views/profile/profile.component';
import { CardLineChartComponent } from './compenents/card/card-line-chart/card-line-chart.component';
import { CardBarChartComponent } from './compenents/card/card-bar-chart/card-bar-chart.component';
import { CommonModule } from '@angular/common';
import { DashAdminComponent } from './layout/dash-admin/dash-admin.component';
import { CardProfileComponent } from './compenents/card/card-profile/card-profile.component';
import { CardTableComponent } from './compenents/card/card-table/card-table.component';
import { CardStatsComponent } from './compenents/card/card-stats/card-stats.component';
import { CardSettingsComponent } from './compenents/card/card-settings/card-settings.component';
import { TableDropdownComponent } from './compenents/dropdowns/table-dropdown/table-dropdown.component';
import { PagesDropdownComponent } from './compenents/dropdowns/pages-dropdown/pages-dropdown.component';
import { LangingComponent } from './views/admin/langing/langing.component';
import { ExpertsComponent } from './views/admin/experts/experts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './carousel/carousel.component';
import { RejeterComponent } from './views/admin/rejeter/rejeter.component';


@NgModule({
  declarations: [
    AppComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    AnnoncesComponent,
    DashboardComponent,
    DemandeexpertComponent,
    UtilisateurComponent,
    LoginComponent,
 
    SidebarComponent,
    AdminNavbarComponent,
    HeaderStatsComponent,
    FooterAdminComponent,
    SettingsComponent,
    TablesComponent,
    MapsComponent,

    ProfileComponent,
     CardLineChartComponent,
     CardBarChartComponent,
     DashAdminComponent,
     CardProfileComponent,
     CardTableComponent,
     CardStatsComponent,
     CardSettingsComponent,
     TableDropdownComponent,
     PagesDropdownComponent,
     LangingComponent,
     ExpertsComponent,
     CarouselComponent,
     RejeterComponent,
    
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule ,
    HttpClientModule
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
