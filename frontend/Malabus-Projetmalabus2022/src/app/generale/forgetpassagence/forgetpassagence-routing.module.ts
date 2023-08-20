import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetpasswordAgenceComponent } from '../resetpassword-agence/resetpassword-agence.component';
import { ForgetpassagenceComponent } from './forgetpassagence.component';

const routes: Routes = [
  {path : "" , component : ForgetpassagenceComponent},
  {path : "resetPasswordagence" , component : ResetpasswordAgenceComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetpassagenceRoutingModule { }
