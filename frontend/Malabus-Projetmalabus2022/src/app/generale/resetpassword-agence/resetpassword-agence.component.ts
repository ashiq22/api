import { Component, OnInit } from '@angular/core';
import { BehaviorSubject , switchMap} from 'rxjs';
import { AgenceService } from 'src/app/_services/agence.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-resetpassword-agence',
  templateUrl: './resetpassword-agence.component.html',
  styleUrls: ['./resetpassword-agence.component.css']
})
export class ResetpasswordAgenceComponent implements OnInit {
  showPassword: boolean = false;

  form: any = {
    username: null,
    password: null,
    confirmPass: null
  };
  errorMessage = {show: false , msg : ''}
  refreshLogin = new BehaviorSubject<boolean>(true);
  showMsg: boolean = false;
  constructor(
    private agenceService : AgenceService ,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  resetPassword() {
    const { username,  password, confirmPass} = this.form;
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    this.agenceService.resetPassword( username,  password, confirmPass, token).subscribe((res: any)=>{
        this.showMsg = true
    },
    err=> this.errorMessage = {show : true , msg : err.error},
    ),
    this.refreshLogin.pipe(switchMap(_ => this.agenceService.resetPassword(username,
       password, confirmPass, token))
       )
  }
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
}
