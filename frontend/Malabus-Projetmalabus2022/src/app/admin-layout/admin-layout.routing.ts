import { Routes } from "@angular/router";
import { DashboardComponent } from "src/app/pages/dashboard/dashboard.component";
import { UserComponent } from "src/app/pages/user/user.component";
import { AddInfoligneComponent } from "src/app/pages/add-infoligne/add-infoligne.component";
import { GestionVoyageComponent } from "src/app/pages/gestion-voyage/gestion-voyage.component";
import { ForumComponent } from "src/app/pages/forum/forum.component";
import { HistoriqueComponent } from "src/app/pages/historique/historique.component";
import { RapportComponent } from "src/app/pages/rapport/rapport.component";
export const AdminLayoutRoutes: Routes = [
  
 { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "forum", component: ForumComponent },
  { path: "historique", component: HistoriqueComponent },
  { path: "rapport", component: RapportComponent },


 // { path: "add-arret", component: AddArretComponent },
 // { path: "add-ligne", component: AddLigneComponent },
  { path: "add-infoligne", component: AddInfoligneComponent },
  {path : "gestionvouyage" , component: GestionVoyageComponent },
];
