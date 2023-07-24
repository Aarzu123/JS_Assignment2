import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { User } from '../User';

@Component({

 selector: 'app-login',

 templateUrl: './login.component.html',

 styleUrls: ['./login.component.css']

})

export class LoginComponent  {

  username = new FormControl();
  submitMessage:string;
  password = new FormControl();

  loginForm:FormGroup;

  uObj:User;

  constructor(private authservice:AuthenticationService, private routerservice:RouterService){
   this.uObj = new User();
   this.loginForm = new FormGroup({
    username:this.username,
    password: this.password

   })

  }

  loginSubmit() {
    console.log("loginForm: "+this.loginForm)
   this.uObj=this.loginForm.value;
    console.log("Inside login submit: "+this.uObj.username+" "+this.uObj.password);
    if(this.loginForm.valid){
        this.authservice.authenticateUser(this.uObj).subscribe(
        (res:any) => {console.log("token "+res["token"]);
        this.authservice.setBearerToken(res["token"]);
        this.routerservice.routeToDashboard();
        },

        //err=>{console.log(err)}
        err => {
          this.submitMessage = err.message;
          if (err.status === 403) {
            this.submitMessage = 'Unauthorized';
          } else {
            this.submitMessage = 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found';
          }
        }
        
      )
    }
  }
}