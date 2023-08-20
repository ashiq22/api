import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  refreshForget = new BehaviorSubject<boolean>(true);
  showMsg: boolean = false;
  errorMessage = {show: false , msg : ''}
  form: any = {
    email: null,
  };
  constructor(private UserService : UserService ,  private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
  }
  forgetPass(){
    const { email } = this.form;
    this.UserService.forgetPassword(email).subscribe((res: any)=>{
        this.errorMessage = {show : false , msg: "" }
        this.showMsg= true;
    },
    err=>{
      this.errorMessage = {show : true , msg : err.error}
      this.showMsg = false ;
      this.refreshForget.pipe(switchMap(_ => this.UserService.forgetPassword(email)))
    }
    )
  }
}
