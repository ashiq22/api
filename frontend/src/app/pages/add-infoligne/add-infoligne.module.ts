import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { AddInfoligneRoutingModule } from './add-infoligne-routing.module';
//import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AddInfoligneRoutingModule,
    MatDialogModule,
    HttpClientModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AddInfoligneModule { }
