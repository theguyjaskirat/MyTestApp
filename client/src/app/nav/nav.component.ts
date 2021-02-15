import { Component, OnInit } from '@angular/core';
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
   
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    //this.currentUser$= this.accountService.currentUser$;
  }
  login() {
    this.accountService.login(this.model)
      .subscribe(res => {
        console.log(JSON.stringify(res));
        //this.loggedIn = true;
      }, error => {
        console.log(error);
      })
  }
  logout() {
    this.accountService.logout();
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
