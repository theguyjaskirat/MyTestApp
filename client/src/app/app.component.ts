import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My First test APP';
  users: any;
  constructor(private accountservice: AccountService) {

  }
  ngOnInit(): void {
    
    this.setCurrentUser();
  }
  setCurrentUser() {
    console.log('get current user app component');
    const user: User = JSON.parse(localStorage.getItem("user"));
    this.accountservice.setCurrentUser(user);
    console.log(user + 'from set current user in app component');
  }
 
}
