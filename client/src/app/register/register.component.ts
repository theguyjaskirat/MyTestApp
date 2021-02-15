import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //@Input() usersFromHomeComponent:any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private accountservice: AccountService) { }

  ngOnInit(): void {
  }
  register() {
    this.accountservice.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();

    }, error => { console.log(error); }
    )
    
  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
