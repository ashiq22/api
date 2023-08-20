import { Component, OnInit, NgZone, ɵɵclassMapInterpolate3 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig, NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserService } from '../../_services/user.service';
import { FormGroup, FormBuilder, FormControl, Validator, Validators, ValidationErrors, AbstractControl } from "@angular/forms";
import { Observable, BehaviorSubject, switchMap, catchError } from 'rxjs';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { CustomValidators } from '../custom-validators/custom-validators';
import { map, startWith  } from 'rxjs/operators';


@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.css'],
  providers: [NgbCarouselConfig]
})
export class PagePrincipaleComponent implements OnInit {
  show_button: Boolean = false;
  show_eye: Boolean = false;
  collapsed = true;
  showPassword: boolean = false;
  searchTicket: FormGroup;
  dataRecherche: any;
  dataArret: any
  initdata!: any;
  pagerecherche: any;


  dateVoyage = new FormControl('')
  arretDepart = new FormControl('')
  arretArrive = new FormControl('')

  /**form controler agence */
  nameagency = new FormControl('', [ Validators.pattern('^[a-zA-Z\s]+$'), Validators.required , CustomValidators.nameagenceValidatror()]);
  matricule = new FormControl('', [Validators.required , CustomValidators.matriculeValidatror()]);
  email = new FormControl('', [Validators.required, Validators.email]);
  num_cnss = new FormControl('', [Validators.required , CustomValidators.cnssagenceValidatror()]);
  business_sector = new FormControl('', Validators.required);
  legal_status = new FormControl('', Validators.required);
  telAgence =  new FormControl('', Validators.required);
  telpesContact =  new FormControl('', Validators.required);
  nompersonneContact =  new FormControl('', Validators.required);
  prenomersonneContact =  new FormControl('', Validators.required);
  adressAgencce =  new FormControl('', Validators.required);
  villeAgence =  new FormControl('', Validators.required);
  postalCodeagence =  new FormControl('', Validators.required);


  


  /**form controller contact */
  emailUser = new FormControl('', Validators.required);
  texte = new FormControl('', Validators.required);
  nomUser = new FormControl('', Validators.required);



  /**form controler user */
  fname = new FormControl('' , [Validators.required , CustomValidators.lengthValidatorname() ], )
  lname = new FormControl('' , [Validators.required , CustomValidators.lengthValidatorname() ])
  username = new FormControl('' , [Validators.required])
  birthday = new FormControl('' , [Validators.required] )
  phoneNum = new FormControl('' , [Validators.required])
  emailuser = new FormControl('' , [Validators.required , Validators.email])
  password =new FormControl('' , [Validators.required , CustomValidators.lengthValidator() ,
     CustomValidators.UpperValidator() , CustomValidators.LowerValidator() ,
      CustomValidators.specialValidator() , CustomValidators.degitValidatror()])
  job = new FormControl('' , [Validators.required ])
  civility = new FormControl('' , [Validators.required])
  address = new FormControl('' , [Validators.required])
  postalCode = new FormControl('' , [Validators.required])
  city = new FormControl('' , [Validators.required])
  country = new FormControl('' , [Validators.required])

  /**declaration variables */
  ContactForm : FormGroup;
  voyageurForm: FormGroup;
  agenceForm: FormGroup;
  showMsgAddagency: boolean = false;
  showMsgAddUser: boolean = false;
  showMsg: boolean = false;
  errorMessage = { show: false, msg: '' }
  errorMessagecontact = { show: false, msg: '' }
  errorMessageFB = { show: false, msg: '' }
  user: any;
  images = [
    "assets/images/laposte.png",
    "assets/images/act.png",
    "assets/images/minister.png",
    "assets/images/nakl.png",
    "assets/images/laposte.png",
    "assets/images/paymee.png"
  ]
  closeResult: string = '';
  active = 1;
  form: any = {
    credentels: null,
    password: null,
  };
  textShow : any;
  textShow2 : any;
  textShow3 : any;
  textShowpls : any;
  showconf : any;
  showmention: any;
  condiong : any;
  contactns : any;
  page1 = true ;
  page2 = true ;
  page3 = true ;
  page4 = true ;
  page5 = true;
  page6 = true;
  iframe = true;
  imagelan = true;
  textlang= true;
  ensavoir = false





  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  isLoginVoyageur = false;
  public gfg = true;
  public Agfg = true;
  dataReceved: any;
  refreshLogin = new BehaviorSubject<boolean>(true);
  /**Constructor */
  constructor(config: NgbCarouselConfig, private modalService: NgbModal, 
    private UserSerice: UserService,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,
    private _router: Router,
    private authServiceSocial: SocialAuthService,
    private authService: AuthService, private tokenStorage: TokenStorageService) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    /**formBuilder user */
    this.voyageurForm = this.formBuilder.group({
      fname: this.fname,
      lname: this.lname,
      username: this.username,
      birthday: this.birthday,
      phoneNum: this.phoneNum,
      email: this.emailuser,
      password: this.password,
      job: this.job,
      civility: this.civility,
      address: this.address,
      postalCode: this.postalCode,
      city: this.city,
      country: this.country,
    })
    /**formBuilder agence */
    this.agenceForm = this.formBuilder.group({
      nameagency: this.nameagency,
      matricule: this.matricule,
      email: this.email,
      num_cnss: this.num_cnss,
      business_sector: this.business_sector,
      legal_status: this.legal_status ,
      telAgence : this.telAgence,
      telpesContact : this.telpesContact,
      nompersonneContact : this.nompersonneContact ,
      prenomersonneContact :  this.prenomersonneContact ,
      adressAgencce :  this.adressAgencce ,
      villeAgence :  this.villeAgence ,
      postalCodeagence :  this.postalCodeagence
      
    })
    this.searchTicket = this.formBuilder.group({
      dateVoyage: this.dateVoyage,
      arretDepart: this.arretDepart,
      arretArrive: this.arretArrive,

    })


      /**formBuilder contact */
      this.ContactForm = this.formBuilder.group({
        nomUser: this.nameagency,
        emailUser: this.emailUser,
        texte: this.texte,
      })
  }

  /**modal connexion */
  openVerticallyCentered(content: any) {
    
    this.isLoginVoyageur = true;
    
    this.modalService.open(content, { centered: true, size: 'md' });
  }
 /**Login facebook */
 signInWithFB(): void {
  this.authServiceSocial.signIn(FacebookLoginProvider.PROVIDER_ID);
}
/**login google */
signInHandler(): void {
  console.log("Test button google");
  
  this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID);

}

async ngOnInit() {
  if (this.tokenStorage.getToken()) {
    this.isLoggedIn = true;
  } else {
    
    await this.authServiceSocial.authState.subscribe(async (user: any) => {
      console.log(user);
      
      const data = await this.UserSerice.findUserByEmail(user.email)
        .subscribe(response => {
          this.tokenStorage.saveToken(response.token);
          this.tokenStorage.saveUser(response);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.modalService.dismissAll();
          this._router.navigate(['/voyageur']);
        }, err => {
          this.isLoginFailed = false;
          this.isLoggedIn = false;
          this.authServiceSocial.signOut();
          this.errorMessage = { show: true, msg: "Email n\'existe pas veuillez crée une compte" }
        });


    });
  }

  this.dataArret = this.arretArrive.valueChanges.pipe(
    startWith(''),
    map(value => this.search(value || '')),
  );

  this.UserSerice.getArret().subscribe(data => {
    this.dataArret = data;
    this.initdata = data
  })


}
  /**Login user*/
  onSubmit(): void {
    const { credentels, password } = this.form;
    this.authService.login(credentels, password).subscribe(data => {
      this.tokenStorage.saveToken(data);
      this.tokenStorage.saveUser(data);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.modalService.dismissAll();
      this._router.navigate(['/voyageur']);
    }, err => this.errorMessage = { show: true, msg: err.error },

    )
    this.refreshLogin.pipe(switchMap(_ => this.authService.login(credentels, password)))
  }

  addContact () : any {
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



  /**Login agence */
  onSubmitagence(): void {
    const { credentels, password } = this.form;
    this.authService.loginAgence(credentels, password).subscribe(data => {
      
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.modalService.dismissAll();
      this._router.navigate(['/agence/add-infoligne']);
    },
      err => this.errorMessage = { show: true, msg: err.error },
    )
    this.refreshLogin.pipe(switchMap(_ => this.authService.login(credentels, password)))
  }
  /**Register user*/
  addUser(): any {
    let data = this.voyageurForm.getRawValue()
    this.UserSerice.createUser(data)
      .subscribe(() => {
        this.showMsgAddUser = true;
      }, err => this.errorMessage = { show: true, msg: err.error },);
  }
  /**Register Agence*/
  addAgence(): any {
    let data = this.agenceForm.getRawValue();
    this.UserSerice.createAgence(data)
      .subscribe(() => {
        this.showMsgAddagency = true;
      },
        error => this.errorMessage = { show: true, msg: error.error },
      );
  }


 
 

  showText(){
    this.imagelan = false;
    this.textlang= false;
   }

   showTextpls(){
    this.textShowpls = true;
    this.showconf = false;
    this.showmention = false;
    this.condiong = false;

    this.page1 = false;
    this.page2 =false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false
    this.contactns = false;

   }
   
   confidet()
{
  this.showconf = true;
  this.textShowpls = false;
  this.showmention = false;
  this.condiong = false;
  this.page1 = false;
    this.page2 =false;
    this.page3 = false;
    this.page4 = false;
    this.page5 = false;
    this.page6 = false
    this.contactns = false;


}
mention(){
  this.showmention = true;

  this.textShowpls = false;
  this.showconf = false;
  this.condiong = false;

  this.page1 = false;
  this.page2 =false;
  this.page3 = false;
  this.page4 = false;
  this.page5 = false;
  this.page6 = false
  this.contactns = false;


}

conditionG(){
  this.condiong = true;


  this.textShowpls = false;
  this.showconf = false;
  this.showmention = false;
  this.page1 = false;
  this.page2 =false;
  this.page3 = false;
  this.page4 = false;
  this.page5 = false;
  this.page6 = false
  this.contactns = false;


}
contactnous(){
  this.contactns = true;
  this.textShowpls = false;
  this.showconf = false;
  this.showmention = false;
  this.page1 = false;
  this.page2 =false;
  this.page3 = false;
  this.page4 = false;
  this.page5 = false;
  this.page6 = false
  this.iframe = false


}
   showText2(){
    this.textShow2 = true;
   }

   showText3(){
    this.textShow3 = true;
   }

   showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  isShown: boolean = false ; // hidden by default
  isShownadresse: boolean = false ; // hidden by default
  isShownContact: boolean = false ; // hidden by default




toggleShow() {

this.isShown = ! this.isShown;

}
toggleShowAdresse() {

  this.isShownadresse = ! this.isShownadresse;
  
  }
  toggleShowContact() {

    this.isShownContact = ! this.isShownContact;
    
    }
  


    searchTicketenligne(): any {
      let data = this.searchTicket.getRawValue();
      console.log("1",data);

      
      this.UserSerice.getTicket(data)
        .subscribe((ticket) => {
          
          this.dataRecherche = ticket
          console.log("2",this.dataRecherche = ticket);

          this.errorMessage = {show : false , msg: "" }
          this.showMsg= true;
                  this.errorMessage = {show : false , msg: "" }
  
        }, err=>{
          this.showMsg= false;
  
          this.errorMessage = {show : true , msg : err.error}
  
          
        }
        )
    }


    search(event: any) {
      let element = event.target.value.toLowerCase()
      this.dataArret = this.initdata.filter((arret: any) => arret.nom_arret.toLowerCase().includes(element))
    }


    openresr(content : any) {
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
  
    ensavoirplus(){
      this.ensavoir = ! this.ensavoir;
     }

}


