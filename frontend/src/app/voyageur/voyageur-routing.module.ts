import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponentComponent } from './service-component/service-component.component';
import { VoyageurComponent } from './voyageur.component';

const routes: Routes = [{ path: '', component: VoyageurComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoyageurRoutingModule { }
