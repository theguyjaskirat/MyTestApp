import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private http:HttpClient) { }
users:any;
  ngOnInit(): void {
  }
  getusers() {
    this.http.get('http://localhost:5001/api/users').subscribe(res => {
      this.users = res;
    }),
      error => {
        console.log(error);
      }
  }
}
