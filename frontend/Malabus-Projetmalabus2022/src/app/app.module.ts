import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagePrincipaleComponent } from './generale/page-principale/page-principale.component';
import { ResetpasswordComponent } from './generale/resetpassword/resetpassword.component';
import {
  SocialAuthServiceConfig,
  SocialAuthService,
  GoogleLoginProvider
} from 'angularx-social-login';
import {
  FacebookLoginProvider,
} from 'angularx-social-login';
import { ConfirmCompteComponent } from './generale/confirm-compte/confirm-compte.component';

import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { authInterceptorProviders } from "./_helpers/auth.interceptor";
import { AddArretComponent } from './pages/add-arret/add-arret.component';
import { AddLigneComponent } from './pages/add-ligne/add-ligne.component';
import { AddInfoligneComponent } from './pages/add-infoligne/add-infoligne.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { ForumComponent } from './pages/forum/forum.component';
import { HistoriqueComponent } from './pages/historique/historique.component';
import { RapportComponent } from './pages/rapport/rapport.component';
import { UserComponent } from './pages/user/user.component';
import { GestionVoyageComponent } from './pages/gestion-voyage/gestion-voyage.component';
import { AddComponent } from './pages/add-infoligne/add/add.component';
import { ResetpasswordAgenceComponent } from './generale/resetpassword-agence/resetpassword-agence.component';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    PagePrincipaleComponent,
    ResetpasswordComponent,
    ConfirmCompteComponent,
    AdminLayoutComponent,
    AddArretComponent,
    AddLigneComponent, 
    AddInfoligneComponent,
     ResetpasswordComponent,
     ForumComponent,
     HistoriqueComponent,
     RapportComponent , 
     UserComponent , 
     GestionVoyageComponent, ResetpasswordAgenceComponent
    ],
  imports: [
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],

  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
           provider: new FacebookLoginProvider('400650571570157'),
          },
          
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
             '763761538046-85ufmo9954927kotbve3j667ve7jvoel.apps.googleusercontent.com'            )
          }
          
        ],
        onError: (err: any) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    
    SocialAuthService,
  ],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
