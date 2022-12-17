import { Component, Input, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { IncomingResponse } from '../models/incomingdata.model';
import { RegisterForm } from '../models/userInputForm';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css'],
})
export class ViewuserComponent implements OnInit {
  @Input('user')
  userData: string;

  showDetails = false;

  user: RegisterForm;

  constructor(private service: MainService) {}

  ngOnInit(): void {
    this.service.searchByUsername(this.userData).subscribe((response) => {
      if (response.status == 200) {
        this.user = response.body as RegisterForm;
        this.showDetails = true;
      }
    });
  }
}
