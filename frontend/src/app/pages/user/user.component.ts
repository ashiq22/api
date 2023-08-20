import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
    form: any
  agency: any
  token: any
  UserId: any
  imageUp:any

  constructor(private tokenStorageService: TokenStorageService , private _router : Router , private UserSerice: UserService ) {
    this.token = sessionStorage.getItem('auth-user')
    this.agency = JSON.parse(this.token)
    this.form = this.agency.agency
  }

  ngOnInit() {
    this.token = sessionStorage.getItem('auth-user')
    this.agency = JSON.parse(this.token)
    this.form = this.agency.agency
    this.UserId = this.agency.agency._id
  }
  getImage(event:any){
    this.imageUp=event.target.files[0]
  }

  updateAgence(f: any): void {
    let data = f.value
    let formData=new FormData()
    formData.append('matricule',data.matricule)
    formData.append('telAgence',data.telAgence)
    formData.append('num_cnss',data.num_cnss)
    formData.append('business_sector',data.business_sector)
    formData.append('legal_status',data.legal_status)
    formData.append('email',data.email)
    formData.append('name_agency',data.name_agency)
if(this.imageUp)
{ formData.append('image',this.imageUp)}
else
{formData.append('imagePath',data.imagePath)}
       this.UserSerice.updateAgence(this.UserId, formData)
      .subscribe(response => {
        sessionStorage.removeItem('auth-user')
        sessionStorage.setItem('auth-user', JSON.stringify(response))
        window.location.reload();
      })
  }
}
