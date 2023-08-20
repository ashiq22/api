import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { VoyageurRoutingModule } from './voyageur-routing.module';
import { VoyageurComponent } from './voyageur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ServiceComponentComponent } from './service-component/service-component.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    VoyageurComponent,
    DashboardComponent,
    UpdateprofileComponent,
    ServiceComponentComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgbModule,
    VoyageurRoutingModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatListModule,
      MatStepperModule,
  ],
  providers : [authInterceptorProviders],

})
export class VoyageurModule {

  
 }
