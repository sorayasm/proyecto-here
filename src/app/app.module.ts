import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { VoluntarioFormComponent } from './componentes/voluntario-form/voluntario-form.component';
import { OrgFormComponent } from './componentes/org-form/org-form.component';
import { MapComponent } from './componentes/map/map.component';
import { SolicitanteComponent } from './componentes/solicitante/solicitante.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MenuSolicitanteComponent } from './componentes/menu-solicitante/menu-solicitante.component';
import { MenuVoluntarioComponent } from './componentes/menu-voluntario/menu-voluntario.component';
import { MenuOrgComponent } from './componentes/menu-org/menu-org.component';
import { OrgProfileComponent } from './componentes/org-profile/org-profile.component';
import { VolProfileComponent } from './componentes/vol-profile/vol-profile.component';
import { SolProfileComponent } from './componentes/sol-profile/sol-profile.component';

// funcionalidades y estilos
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrgProfileComponent } from './componentes/org-profile/org-profile.component';

// Angular Material
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

// Servicios
import { OrgService } from './servicios/org.service';
import { VolService } from './servicios/vol.service';
import { AuthService } from './servicios/auth.service';



// Rutas
const appRoutes: Routes = [
  {
   path: '',
   component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'org-form',
    component: OrgFormComponent
  },
  {
    path: 'voluntario-form',
    component: VoluntarioFormComponent
  },
  {
    path: 'menu-org',
    component: MenuOrgComponent,
  },
  {
    path: 'menu-solicitante',
    component: MenuSolicitanteComponent,
  },
  {
    path: 'menu-voluntario',
    component: MenuVoluntarioComponent,
  },
  {
    path: 'solicitante',
    component: SolicitanteComponent,
  }
];


// Services
export function getOrgServiceConfigs() { }

@NgModule({
  declarations: [
    AppComponent,
    VoluntarioFormComponent,
    HomeComponent,
    MapComponent,
    LoginComponent,
    OrgFormComponent,
    RegistroComponent,
    SolicitanteComponent,
    MenuSolicitanteComponent,
    MenuVoluntarioComponent,
    MenuOrgComponent,
    OrgProfileComponent,
    VolProfileComponent,
    SolProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'proyecto-here'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatCardModule,
    MatChipsModule,
  ],
    exports: [
      RouterModule
  ],
  providers: [
    OrgService,
    VolService,
    AuthService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
