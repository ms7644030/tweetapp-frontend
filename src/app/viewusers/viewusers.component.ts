import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { IncomingResponse } from '../models/incomingdata.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css'],
})
export class ViewusersComponent implements OnInit {
  userNameList: string[];
  userSelected: boolean = false;
  selectedUser: string;
  constructor(private service: MainService, private shared : SharedService) {
    this.userNameList = [];
  }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((response) => {
      if (response.status == 200) {
        this.userNameList = response.body as string[];
      }
    });
  }

  selectUser(user: string) {
    this.shared.setUsername(user);
    this.shared.setSelected(this.userSelected);
    if (
      user != null &&
      user == this.selectedUser &&
      this.userSelected == true
    ) {
      this.userSelected = false;
    } else {
      this.userSelected = !this.userSelected;
      this.selectedUser = user;
      //this.userSelected = true;
      

      

    }
  }

  scrollTop() {
    window.scrollTo(0, 0);

    //this.scroll.nativeElement.scrollTop = 0;
  }
}
