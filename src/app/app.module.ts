import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetappComponent } from './tweetapp/tweetapp.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewtweetComponent } from './newtweet/newtweet.component';
import { TweetlistComponent } from './tweetlist/tweetlist.component';
import { ViewusersComponent } from './viewusers/viewusers.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { SharedService } from './shared.service';

@NgModule({
  declarations: [
    AppComponent,
    TweetappComponent,
    LoginComponent,
    RegisterComponent,
    NewtweetComponent,
    TweetlistComponent,
    ViewusersComponent,
    ViewuserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
