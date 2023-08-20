import { Component, OnInit } from '@angular/core';
import { AgenceService } from 'src/app/_services/agence.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
export interface dataDialog {
  action: string,
  data: any
}
@Component({
  selector: 'app-add-infoligne',
  templateUrl: './add-infoligne.component.html',
  styleUrls: ['./add-infoligne.component.scss']
})
export class AddInfoligneComponent implements OnInit {
  title = 'ng-bootstrap-modal-demo';
  dateVoyage = new FormControl('')
  Nbrtickets = new FormControl('')
  addDateForm: FormGroup;
  closeResult: any;
  form: any;
  modalOptions!: NgbModalOptions;
  nom_ligne = new FormControl('')
  arretligne = new FormControl('')
  heur_dep = new FormControl('')
  heur_arriv = new FormControl('')
  prix = new FormControl('')
  distance = new FormControl('')
  num_bus = new FormControl('')
  duree = new FormControl('')
  nbr_place = new FormControl('')
  showMsgAddLigne: boolean = false;
  errorMessage = { show: false, msg: '' }
  ligneinfoForm!: FormGroup;
  dataArray: any;
  dataLigne: any;
  dataArret: any;
  initdata!: any
  UserId: any;
  token: any;
  agence: any;
  idLigne: any;
  imagePath : any ;
  dataArretDetails : any;
  dataEchange: dataDialog = { action: "add", data: {} };
  constructor(private serviceAgence: AgenceService,
    public formBuilder: FormBuilder, private modalService: NgbModal,
    public dialog: MatDialog,
    private _router : Router ,
  ) {

    this.addDateForm = this.formBuilder.group({
      dateVoyage: new FormControl(''),
      Nbrtickets :new FormControl('')
    })
  
  }

  deleteligne(_id: any, i: number) {
    let conf = confirm("Vous êtes sûrs de supprimer cette agence ?")
    if (conf) {
      this.serviceAgence.deleteLigne(_id).subscribe(data => {
        this.dataArray.splice(i, 1)
      })
    }
  }
 
  ngOnInit(): void {


   

    this.token = sessionStorage.getItem('auth-user')
    this.agence = JSON.parse(this.token)


    this.serviceAgence.getAllligne().subscribe(data => {
      this.dataLigne = data;
    })
    this.serviceAgence.getAllArret().subscribe(data => {
      this.dataArret = data;

    })
    

    this.serviceAgence.getAllligneinfobyid(this.agence.agency._id).subscribe(data => {
      
      this.dataArray = data
      this.initdata = data
    })

  }

  open(content: any, action: any) {
    this.dataEchange = { action: action, data: content }
    const dialogInfoligne = this.dialog.open(AddComponent, {
      width: '60%', height :'100%',
      data: this.dataEchange
    })
    dialogInfoligne.afterClosed().subscribe((result) => {

    })


  }
  openDetailleArret(content : any, itemArret: any) {
    this.dataArretDetails = itemArret;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      
    });
  }
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  search(event: any) {
    let element = event.target.value.toLowerCase()
    if (element == "") {
      this.dataArray = this.initdata
    } else {
      this.dataArray = this.initdata.filter((ligne : any) => ligne.nom_ligne.toLowerCase().includes(element))
    }

  }




  openAddvoyage(dateVoyage : any, idLigne: any , nomligne :any , num_bus : any , arretligne : any){
    this.idLigne = idLigne;
    this.nom_ligne = nomligne ;
    this.num_bus = num_bus ;
    this.arretligne = arretligne ;
  this.modalService.open(dateVoyage, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

  addDateticketVoyageFunction(){

    let dataType = {
      data: this.addDateForm.getRawValue(),
      idInfoligne: this.idLigne,
      nom_ligne : this.nom_ligne,
      num_bus : this.num_bus,
      arretligne : this.arretligne,
      nameagency: this.agence.agency.nameagency,
      id_agence :   this.agence.agency._id,
      imagePath : this.agence.agency.imagePath    };    
    this.serviceAgence.addDatenbTickets(dataType).subscribe(() => {
      this._router.navigate(['/agence/gestionvouyage']);
    })

  }








}
