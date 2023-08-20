


import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})


export class UpdateprofileComponent implements OnInit {
  user: any
  token: any
  UserId: any
  form: any


  constructor(private UserSerice: UserService) {
    this.token = sessionStorage.getItem('auth-user')
    this.user = JSON.parse(this.token)
    this.form = this.user.user
  }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('auth-user')
    this.user = JSON.parse(this.token)
    this.form = this.user.user
    this.UserId = this.user.user._id
  };

  updateuser(f: any): void {
    let data = f.value
    this.UserSerice.updateuser(this.UserId, data)
      .subscribe(response => {
        sessionStorage.removeItem('auth-user')
        sessionStorage.setItem('auth-user', JSON.stringify(response))
        window.location.reload();
      })
  }




}
