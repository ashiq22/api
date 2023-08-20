import { Component, OnInit } from '@angular/core';
import { BehaviorSubject , switchMap } from 'rxjs';
import { AgenceService } from 'src/app/_services/agence.service';

@Component({
  selector: 'app-forgetpassagence',
  templateUrl: './forgetpassagence.component.html',
  styleUrls: ['./forgetpassagence.component.css']
})
export class ForgetpassagenceComponent implements OnInit {
  refreshForget = new BehaviorSubject<boolean>(true);
  showMsg: boolean = false;
  errorMessage = {show: false , msg : ''}
  form: any = {
    email: null,
  };
  constructor(private agenceService : AgenceService ) { }

  ngOnInit(): void {
  }
  forgetPass(){
    const { email } = this.form;
    this.agenceService.forgetPassword(email).subscribe((res: any)=>{
        this.errorMessage = {show : false , msg: "" }
        this.showMsg= true;
    },
    err=>{
      this.errorMessage = {show : true , msg : err.error}
      this.showMsg = false ;
      this.refreshForget.pipe(switchMap(_ => this.agenceService.forgetPassword(email)))
    }
    )
  }
}
