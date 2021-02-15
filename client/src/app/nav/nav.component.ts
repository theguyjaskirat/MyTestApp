import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
   
  constructor(public accountService: AccountService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    //this.currentUser$= this.accountService.currentUser$;
  }
  login() {
    this.accountService.login(this.model)
      .subscribe(res => {
        this.router.navigateByUrl('/members');
        console.log(JSON.stringify(res));
        this.toastr.error("welcome");
        //this.loggedIn = true;
      }, error => {
        this.toastr.error(error.error);
         
        console.log(error);
      })
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    //this.loggedIn = false;
  }
  // getCurrentUser() {
  //   console.log('get current user nav component');
  //   this.accountService.currentUser$.subscribe(user => {
  //     console.log('checking user' + !!user);
  //     this.loggedIn = !!user;
  //   }, error => {
  //     console.log(error);
  //   })
  // }
}
