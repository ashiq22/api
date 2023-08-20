import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-confirm-compte',
  templateUrl: './confirm-compte.component.html',
  styleUrls: ['./confirm-compte.component.css']
})
export class ConfirmCompteComponent implements OnInit {
  key : any
  isActivat : boolean = false
  constructor( private route : ActivatedRoute , private authService : UserService  ) { 
    this.key = this.route.snapshot.paramMap.get('key')

    this.authService.confirmUser(this.key).subscribe((data) => {
      this.isActivat = true 
    })

  }

  ngOnInit(): void {
  }

 

}
