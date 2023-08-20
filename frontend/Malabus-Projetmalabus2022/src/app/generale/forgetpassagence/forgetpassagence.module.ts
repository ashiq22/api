import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetpassagenceRoutingModule } from './forgetpassagence-routing.module';
import { ForgetpassagenceComponent } from './forgetpassagence.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForgetpassagenceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ForgetpassagenceRoutingModule
  ]
})
export class ForgetpassagenceModule { }
