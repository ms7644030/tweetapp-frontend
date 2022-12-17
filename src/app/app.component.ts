import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tweetapp';
  isUserLoggedIn: boolean = false;
  loggedUsername: string;


  constructor(private service: MainService) {
    // localStorage.setItem("tweetapp-loggeduser", "glinzac");
    this.service.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res;
      if (this.isUserLoggedIn == true) {
        this.loggedUsername = localStorage.getItem("tweetapp-loggeduser");
      }
    });
  }

  logOut() {
    localStorage.removeItem("tweetapp-loggeduser");
    this.service.isUserLoggedIn.next(false);
  }

}
