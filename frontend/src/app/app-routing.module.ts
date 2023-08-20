import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmCompteComponent } from './generale/confirm-compte/confirm-compte.component';
import { PagePrincipaleComponent } from './generale/page-principale/page-principale.component';
import { UpdateprofileComponent } from './voyageur/updateprofile/updateprofile.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
{path : 'confirm/:key' , component : ConfirmCompteComponent },
{path : '' , component : PagePrincipaleComponent},  

{
  path: "agence",
  component: AdminLayoutComponent,
  children: [
    {
      path:""
      
,       loadChildren: () => import ("./admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
    }
  ]
},

{path : 'updateprofil/:voyageurId/edit' , component : UpdateprofileComponent},
{path : 'updateprofil' , component : UpdateprofileComponent},
{path : 'forgetpassword' , data: {}, loadChildren:()=>import('../app/generale/forgetpass/forgetpass.module').then(m=>m.ForgetpassModule)},
{path : 'forgetpasswordagence' , data: {}, loadChildren:()=>import('../app/generale/forgetpassagence/forgetpassagence.module').then(m=>m.ForgetpassagenceModule)},
{ path: 'voyageur', loadChildren: () => import('./voyageur/voyageur.module').then(m => m.VoyageurModule) },











];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
