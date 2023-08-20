import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ForgetpassRoutingModule } from './forgetpass-routing.module';
import { ForgetpassComponent } from './forgetpass.component';


@NgModule({
  declarations: [
    ForgetpassComponent
  ],
  imports: [
    CommonModule,
    ForgetpassRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class ForgetpassModule { }
