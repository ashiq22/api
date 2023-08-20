import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject , switchMap} from 'rxjs';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  showPassword: boolean = false;
  form: any = {
    username: null,
    password: null,
    confirmPass: null
  };
  errorMessage = {show: false , msg : ''}
  refreshLogin = new BehaviorSubject<boolean>(true);
  showMsg: boolean = false;
  constructor(private userService : UserService ,  private router: Router,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
  }
  resetPassword() {
    const { username,  password, confirmPass} = this.form;
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    this.userService.resetPassword( username,  password, confirmPass, token).subscribe((res: any)=>{
        this.showMsg = true
        this.errorMessage = { show: false, msg: "" }
    },
    err=> this.errorMessage = {show : true , msg : err.error},
    ),
    this.refreshLogin.pipe(switchMap(_ => this.userService.resetPassword(username,
       password, confirmPass, token))
       )
  }
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
}
