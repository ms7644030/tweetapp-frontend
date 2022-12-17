import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';
import { RegisterForm } from '../models/userInputForm';
import { IncomingResponse } from '../models/incomingdata.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  userExists: boolean = false;
  registerFormData: RegisterForm;
  success: boolean = false;
  error: boolean = false;
  config: IncomingResponse;
  registerForm: FormGroup = new FormGroup(
    {
      loginId: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      contactNo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.checkPasswords }
  );

  checkPasswords(form: FormGroup) {
    // here we have the 'passwords' group
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  get e() {
    return this.registerForm.errors;
  }

  constructor(private service: MainService) {
    this.registerFormData = new RegisterForm();
  }

  ngOnInit(): void {}

  formSubmit(formData) {
    this.submitted = true;
    if (formData.status == 'VALID') {
      this.registerFormData.emailId = this.f.emailId.value;
      this.registerFormData.loginId = this.f.loginId.value;
      this.registerFormData.firstName = this.f.firstName.value;
      this.registerFormData.lastName = this.f.lastName.value;

      this.registerFormData.password = this.f.password.value;
      this.registerFormData.contactNo = this.f.contactNo.value;
      this.registerFormData.imageurl = ' ';

      this.service
        .registerNewUser(this.registerFormData)
        .subscribe((response) => {
          if (response.status == 201) {
            this.registerForm.reset();
            this.submitted = false;
            this.userExists = false;
            this.success = true;
          } else if (response.status == 409) {
            this.userExists = true;
          } else {
            this.error = true;
          }
        });
    }
  }

  resetMessage() {
    this.userExists = false;
    this.success = false;
    this.error = false;
  }
}
