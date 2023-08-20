import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voyageur } from '../model/voyageur';
import { NgbModal, ModalDismissReasons, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { BehaviorSubject, switchMap } from 'rxjs';
import {render} from 'creditcardpayments/creditCardPayments'



@Component({
  selector: 'app-voyageur',
  templateUrl: './voyageur.component.html',
  styleUrls: ['./voyageur.component.css']
})
export class VoyageurComponent implements OnInit {


  textShowpls: any;
  showconf: any;
  showmention: any;
  condiong: any;
  contactns : any;
  contactnss : any
  page1 = true;
  page2 = true;
  page3 = true;
  page4 = true;
  page5 = true;
  page6 = true;
  iframe = true;
  ensavoir=false;
  imagelan = true;
  textlang= true;


  showMsg: boolean = false;
  errorMessage = { show: false, msg: '' }
  errorMessagecontact = { show: false, msg: '' }

  refreshForget = new BehaviorSubject<boolean>(true);

  /**form controller contact */
  emailUser = new FormControl('', Validators.required);
  texte = new FormControl('', Validators.required);
  nomUser = new FormControl('', Validators.required);
  ContactForm: FormGroup;
  showMsgAddagency: boolean = false;
  images = [
    "assets/images/laposte.png",
    "assets/images/act.png",
    "assets/images/minister.png",
    "assets/images/nakl.png",
    "assets/images/laposte.png",
    "assets/images/paymee.png"
  ]
  minDate = new Date();
  searchTicket: FormGroup;
  user: any
  active = 1;
  page = 3;
  token: any
  UserId: any
  form: any
  Voyageur: Voyageur[] = [];
  dataArry: any;
  dataArray: any;
  imageUp: any;
  textShow = false;
  commentsShow: any;
  public gfg = true;
  closeResult: any;
  id_Voyage: any;
  prix: any;
  heurArrive: any;
  heurDepart: any
  numBus: any;
  nomLigne: any;
  dataArret: any
  nameagency: any
  initdata!: any
  isLinear = true;
  firstFormGroup: any;
  Addreservation: FormGroup;
  secondFormGroup: any;
  dateVoyage = new FormControl('')
  arretDepart = new FormControl('')
  arretArrive = new FormControl('')
  dataRecherche: any;
  dataVoyage: any;
  constructor(private config: NgbPaginationConfig,
    public formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private _router: Router, private modalService: NgbModal,
    private UserSerice: UserService,
    private _formBuilder: FormBuilder ,

    ) {

      render(
        {
          id:"#myPaypalButtons",
          currency:"TND",
          value:"100.00",
          onApprove :(details)=>{
          }
        }
      );
    

    /**reservation */
    this.Addreservation = this.formBuilder.group({
      lname: new FormControl(''),
      fname: new FormControl(''),
      nbPlace: new FormControl(''),
      email_User: new FormControl(''),
      numTel: new FormControl('')
    })
    /**formBuilder contact */
    this.ContactForm = this.formBuilder.group({
      nomUser: this.nameagency,
      emailUser: this.emailUser,
      texte: this.texte,
    })





    this.token = sessionStorage.getItem('auth-user')
    this.user = JSON.parse(this.token)
    this.form = this.user.user
    config.size = 'sm';
    config.boundaryLinks = true;
    this.searchTicket = this.formBuilder.group({
      dateVoyage: this.dateVoyage,
      arretDepart: this.arretDepart,
      arretArrive: this.arretArrive,

    })


  }
  ngOnInit(): void {
    this.dataArret = this.arretArrive.valueChanges.pipe(
      startWith(''),
      map(value => this.search(value || '')),
    );


    this.token = sessionStorage.getItem('auth-user')
    this.user = JSON.parse(this.token)
    this.form = this.user.user
    this.UserId = this.user.user._id


    this.UserSerice.getForum().subscribe(data => {
      this.dataArray = data;
    })


    this.UserSerice.getArret().subscribe(data => {
      this.dataArret = data;
      this.initdata = data
    })



  }

  addContact(): any {
    let data = this.ContactForm.getRawValue();
    this.UserSerice.createContact(data)
    .subscribe(() => {
      this.showMsgAddagency = true;
      this.errorMessagecontact = { show: false, msg: "" }
    },
    (err) => {
      this.errorMessagecontact = { show: true, msg: err.error }
      this.showMsgAddagency = false;

    }
      
    , 
    
    )

  }




  search(event: any) {
    let element = event.target.value.toLowerCase()

    this.dataArret = this.initdata.filter((arret: any) => arret.nom_arret.toLowerCase().includes(element))

  }
  submit(){
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
}
  openach(content: any, data: any, id_Voyage: any, nomLigne: any, nameagency: any,
    dateVoyage: any, prix: any, numBus: any, heurArrive: any,
    heurDepart: any, arretDepart: any, arretArrive: any) {

    this.arretArrive = arretArrive,
      this.arretDepart = arretDepart,
      this.nameagency = nameagency,
      this.id_Voyage = id_Voyage,
      this.heurDepart = heurDepart,
      this.heurArrive = heurArrive,
      this.numBus = numBus,
      this.prix = prix,
      this.dateVoyage = dateVoyage,
      this.nomLigne = nomLigne,
      this.dataVoyage = data,

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  getImage(event: any) {
    this.imageUp = event.target.files[0]
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this._router.navigate(['']);
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  updateuser(f: any): void {
    let data = f.value
    let formData = new FormData()
    formData.append('fname', data.fname)
    formData.append('phoneNum', data.phoneNum)
    formData.append('lname', data.lname)
    formData.append('username', data.username)
    formData.append('address', data.address)
    formData.append('birthday', data.birthday)
    formData.append('city', data.city)
    formData.append('civility', data.civility)
    formData.append('country', data.country)
    if (this.imageUp) { formData.append('image', this.imageUp) }
    else { formData.append('imagePath', data.imagePath) }



    this.UserSerice.updateuser(this.UserId, formData)
      .subscribe(response => {
        sessionStorage.removeItem('auth-user')
        sessionStorage.setItem('auth-user', JSON.stringify(response))
        window.location.reload();
      })
  }

  showText() {
    this.textShow = true;
  }
  showimg(){
    this.imagelan = false;
    this.textlang= false;
   }
  showcomments() {
    this.commentsShow = true;
  }

  openForum(forum: any) {
    this.modalService.open(forum, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  searchTicketenligne(): any {
    let data = this.searchTicket.getRawValue();
    this.UserSerice.getTicket(data)
      .subscribe((ticket) => {
        this.dataRecherche = ticket
        this.errorMessage = { show: false, msg: "" }
        this.showMsg = true;
        this.errorMessage = { show: false, msg: "" }

      }, err => {
        this.showMsg = false;

        this.errorMessage = { show: true, msg: err.error }


      }
      )
  }



  addReservation() {

    let dataType = {
      numBus: this.numBus,
      arretArrive: this.arretArrive,
      arretDepart: this.arretDepart,
      prix: this.prix,
      nameagency: this.nameagency,
      heurArrive: this.heurArrive,
      heurDepart: this.heurDepart,
      id_Voyage: this.id_Voyage,
      nomLigne: this.nomLigne,
      dateVoyage: this.dateVoyage,
      data: this.Addreservation.getRawValue(),
    };

    this.UserSerice.addTeservayion(dataType).subscribe(() => {
    })

  }

  



  showTextpls() {
    this.textShowpls = true;
    this.page1 = false;
    this.page2 = false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false;

  }

  confidet() {
    this.showconf = true;
    this.textShowpls = false;
    this.showmention = false;
    this.condiong = false;
    this.page1 = false;
    this.page2 = false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false
    this.contactnss = false;


  }

  conditionG() {
    this.condiong = true;


    this.textShowpls = false;
    this.showconf = false;
    this.showmention = false;
    this.page1 = false;
    this.page2 = false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false
    this.contactnss = false;


  }
  contactnous() {
    this.contactnss = true;
    this.textShowpls = false;
    this.showconf = false;
    this.showmention = false;
    this.page1 = false;
    this.page2 = false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false


  }



  scrolTo(sectioService: any) {
    sectioService.scrollIntoView({

    })

  }

  scrolTo2(sectioService: any) {
    sectioService.scrollIntoView({
      

    })
    this.textShowpls = true;
    this.condiong = false;
    this.showmention = false;
    this.showconf = false;
    this.contactnss = false;
    this.page1 = false;
    this.page2 = false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false;

  

  }


  scrolTo3(sectioService: any) {
    sectioService.scrollIntoView({
      

    })
    this.condiong = true;
    this.showmention = false;
    this.showconf = false;
    this.contactnss = false;
    this.textShowpls = false;
    this.page1 = false;
    this.page2 = false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false;

  

  }



  scrolTo4(sectioService: any) {
    sectioService.scrollIntoView({
    })

    this.showmention = true;
    this.showconf = false;
    this.contactnss = false;
    this.condiong = false;
    this.textShowpls = false;

    this.page1 = false;
    this.page2 = false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false;
  }


   scrolTo5(sectioService: any)
   {
     sectioService.scrollIntoView({
    })
    this.showconf = true;
    this.contactnss = false;
    this.showmention = false;
    this.condiong = false;
    this.textShowpls = false;


    this.page1 = false;
    this.page2 = false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false;
  }



  scrolTo6(sectioService: any)
  {
    sectioService.scrollIntoView({
      contactnss : true 
     
   })
   this.showconf = false
   this.showmention = false;
   this.condiong = false;
   this.textShowpls = false;
   this.iframe = false



   this.page1 = false;
   this.page2 = false;
   this.page3 = false;
   this.page4 = false;
   this.page5 = false;
   this.page6 = false;

 }

 ensavoirplus(){
  this.ensavoir = ! this.ensavoir;
 }


 





}
