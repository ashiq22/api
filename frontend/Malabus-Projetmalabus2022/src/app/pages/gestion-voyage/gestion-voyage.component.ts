import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { AgenceService } from 'src/app/_services/agence.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-gestion-voyage',
  templateUrl: './gestion-voyage.component.html',
  styleUrls: ['./gestion-voyage.component.scss']
})
export class GestionVoyageComponent implements OnInit {
  dataInfovoyage: any
  initdata!: any
  closeResult: any;
  token: any;
  agence: any;

  constructor(private serviceAgence: AgenceService , private modalService: NgbModal) {
   }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('auth-user')
    this.agence = JSON.parse(this.token)
    this.serviceAgence.getAllDatenbTickets(this.agence.agency._id).subscribe(data=>{
      this.dataInfovoyage = data;
      this.initdata = data
    })
    
  }

  search(event: any) {
    let element = event.target.value.toLowerCase()
    if (element == "") {
      this.dataInfovoyage = this.initdata
    } else {
      this.dataInfovoyage = this.initdata.filter((ligne : any) => ligne.nom_ligne.toLowerCase().includes(element))
    }

  }

  openSm(content : any ) {
    this.modalService.open(content, { size: 'sm' });
  }
  
  
  deleteVoyage(_id: any, i: number) {
      this.serviceAgence.deleteVoyage(_id).subscribe(data => {
      })
  }

  reloadPage(){
    window.location.reload();
  }

  

}
