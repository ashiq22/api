import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AgenceService } from 'src/app/_services/agence.service';
import { dataDialog } from '../add-infoligne.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  initdata!: any
  nom_ligne = new FormControl('')
  ligneForm: FormGroup;
  nom_arret = new FormControl('', [Validators.required])
  longitude = new FormControl('', [Validators.required])
  latitude = new FormControl('', [Validators.required])
  showMsgAddLigne: boolean = false;
  errorMessage = { show: false, msg: '' }
  arretForm: FormGroup;
  closeResult: any;
  modalOptions: any;
  addligneForm!: FormGroup;
  productForm: FormGroup;
  infoDialog = { title: "Ajouter Info Ligne", btn: "ADD" }
  dataArret: any[] = [];
  dataLigne: any[] = [];
  UserId: any;
  token: any;
  agence: any;
  ngDropdown = this.dataArret[0];

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataDialog,
    private fb: FormBuilder,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    private serviceAgence: AgenceService
  ) {

    this.addligneForm = this.fb.group({
      nom_ligne: new FormControl(''),
   //   heur_dep: new FormControl('', [Validators.required]),
    //  arretligne: new FormControl(''),
    //  heur_arriv: new FormControl(''),
      prix: new FormControl(''),
      distance: new FormControl(''),
      type_distance: new FormControl(''),
      unite_prix: new FormControl(''),
      num_bus: new FormControl(''),
      duree: new FormControl(''),
    })
    this.arretForm = this.formBuilder.group({
      nom_arret: this.nom_arret,
      longitude: this.longitude,
      latitude: this.latitude
    })
    this.ligneForm = this.formBuilder.group({
      nom_ligne: this.nom_ligne,
    })
    this.productForm = this.fb.group({
      arretData: this.fb.array([]),
    });
  }


  arretData(): FormArray {
    return this.productForm.get("arretData") as FormArray
  }

  newArret(nom_arret : any, _id : any , latitude:any, longitude:any  ): FormGroup {   
    return this.fb.group({
  
      nom_arret: nom_arret,
      heure_depart: '',
      heure_arrive: '',
      heure_depart_retour :'',
      heure_depart_arrive :'',
      distance : ''+"km",
      prix :''+"dt",
      id: _id,
      latitude : latitude ,
      longitude : longitude

    })
  }

  addArretSelected(nom_arret: any, _id: any ,  latitude:any, longitude:any , index: any ) {    
    this.arretData().push(this.newArret(nom_arret,_id , latitude , longitude ));
  }

  removeArret(i: number) {
    this.arretData().removeAt(i);
  }

  getAllArret = () => {
    this.serviceAgence.getAllArret().subscribe(data => {
      this.dataArret = data;

    })

  }

  getAllLigne = () => {
    this.serviceAgence.getAllligne().subscribe(data => {
      this.dataLigne = data;
      this.initdata = data;

    })
  }
  ngOnInit(): void {
    this.token = sessionStorage.getItem('auth-user')
    this.agence = JSON.parse(this.token)

    
    this.getAllArret();
    this.getAllLigne();

    if (this.data.action == "update") {
      let info = this.data.data
      this.addligneForm.setValue({
        nom_ligne: info.nom_ligne,
     //  arretligne: this.fb.array([info.arretligne]),
        type_distance: info.type_distance,
        unite_prix : info.unite_prix,
      //  heur_dep: info.heur_dep,
      //  heur_arriv: info.heur_arriv,
        prix: info.prix,
        distance: info.distance,
        num_bus: info.num_bus,
        duree: info.duree,
      })
     /*
      this.productForm = this.fb.group({
        arretData: this.fb.array([info.arretligne]),
      });
      */

      this.infoDialog = { title: "Modifier Info ligne", btn: "UPDATE" }
    }





   




  }
  dialogFunction() {
    if (this.data.action == "add") {
      let dataType = {
        data: this.addligneForm.getRawValue(),
        arretligne: this.arretData().value
      };
      this.serviceAgence.AddligneInfo(dataType, this.agence.agency._id)
        .subscribe((reponse) => {
          if (reponse) {
            window.location.reload();

          }
        }, err => this.errorMessage = { show: true, msg: err.error })
    } else {
      let data = this.addligneForm.getRawValue();
      this.serviceAgence.updateLigne(this.data.data._id, data)
        .subscribe((reponse) => {
          if (reponse) {
            this.dialogRef.close(data)
            window.location.reload();
          }
        })
    }
  }

  open(content : any) {
      this.showMsgAddLigne = false;
      this.errorMessage = { show: false, msg: "" }
      this.ligneForm.reset();
      this.arretForm.reset();
    this.modalService.open(content, this.modalOptions).result.then((result) => {      
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
  addArret(): any {
    let data = this.arretForm.getRawValue();
    this.serviceAgence.Addarret(data)
      .subscribe(() => {
        this.showMsgAddLigne = true;
        this.getAllArret();
        this.arretForm.reset();
        this.errorMessage = { show: false, msg: '', }
      },

        err => {

          this.errorMessage = { show: true, msg: err.error }
          this.arretForm.reset();
        },

      );
      this.showMsgAddLigne = false;
    this.errorMessage = { show: false, msg: "" }

  }


  addLigne(): any {

    let data = this.ligneForm.getRawValue();
    this.serviceAgence.Addligne(data)
      .subscribe(() => {
        this.showMsgAddLigne = true;
        this.getAllLigne();
        this.ligneForm.reset();
      },
        err => {
          this.showMsgAddLigne = false;
          this.errorMessage = { show: true, msg: err.error }
          this.ligneForm.reset();
        });
        this.errorMessage = { show: false, msg: "" }

    

  }


  
  search(event: any) {
    let element = event.target.value.toLowerCase()
   
      this.dataLigne = this.initdata.filter((ligne : any) => ligne.nom_ligne.toLowerCase().includes(element))
    

  }

  


 


  

  
}
