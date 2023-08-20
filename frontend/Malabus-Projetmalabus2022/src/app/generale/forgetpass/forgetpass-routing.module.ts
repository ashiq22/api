import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { ForgetpassComponent } from './forgetpass.component';

const routes: Routes = [
  {path : "" , component : ForgetpassComponent},
  {path : "resetPassword" , component : ResetpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetpassRoutingModule { }
