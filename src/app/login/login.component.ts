import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { IncomingResponse } from '../models/incomingdata.model';
import { LoginForm } from '../models/userInputForm';
import { JwtToken } from '../models/JwtToken';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  state: string;
  submitted: boolean = false;
  error: boolean = false;
  errormsg: string;
  success: boolean = false;
  successmsg: string;
  public jwtModal: JwtToken = {} as JwtToken;
  loginform: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private route: ActivatedRoute,
    private service: MainService,
    private currentRoute: Router,
    private jwtToken: SharedService
  ) {
    this.state =
      route.snapshot.routeConfig.path == 'login' ? 'login' : 'forgot';
  }

  get f() {
    return this.loginform.controls;
  }

  ngOnInit(): void {}

  formSubmit() {
    this.submitted = true;
    let formData = new LoginForm();
    formData.username = this.f.username.value;
    formData.password = this.f.password.value;

    if (this.state == 'login') {
      this.service.loginUser(formData).subscribe((response) => {
       // console.log(response);
        this.jwtModal = <JwtToken>response.body;
        if (response.status == 200) {
          this.jwtToken.setJwtToken(this.jwtModal.jwttoken);
          this.success = true;
          this.successmsg = 'Logged In Successfully!';
          localStorage.setItem('tweetapp-loggeduser', formData.username);
          setTimeout(() => {
            this.service.isUserLoggedIn.next(true);
            this.currentRoute.navigate(['/tweets']);
          }, 1000);
        } 
        // else if(response.status == 400){
        //   this.error = true;
        //   this.errormsg = 'Failed to Login! Invalid credentials';
        // }
      },(err) => {
        if(err.status == 400){
            this.error = true;
            this.errormsg = 'Failed to Login! Invalid credentials';
            setTimeout(() => {
              this.resetForm();
              this.loginform.reset();
            }, 2000);
      }
      }
      );
    } else {
      this.service.resetUserPassword(formData).subscribe((response) => {
        if (response.status == 200) {
          this.success = true;
          this.successmsg = 'Reset Password Complete!';
        }
        // } else if (response.status == 400) {
        //   this.error = true;
        //   this.errormsg = 'Invalid User!';
        // } else {
        //   this.error = true;
        //   this.errormsg = 'Invalid Credentials!';
        // }
      },(err) => {
        if(err.status == 400){
            this.error = true;
             this.errormsg = 'Invalid User!';
            setTimeout(() => {
             // this.errormsg = 'Invalid User!';
              this.resetForm();
              this.loginform.reset();
            }, 2000);
      }
      });
    }
  }

  resetForm() {
    this.submitted = false;
    this.error = false;
    this.success = false;
  }
}
