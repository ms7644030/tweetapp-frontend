import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewtweetComponent } from './newtweet/newtweet.component';
import { RegisterComponent } from './register/register.component';
import { TweetappComponent } from './tweetapp/tweetapp.component';
import { TweetlistComponent } from './tweetlist/tweetlist.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { ViewusersComponent } from './viewusers/viewusers.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }, {
    path: "forgot",
    component: LoginComponent
  },
  {
    path: "new",
    component: NewtweetComponent
  }, {
    path: "edit/:id",
    component: NewtweetComponent
  },
  {
    path: "tweets",
    component: TweetlistComponent,
    children: [
      {
        path: ":id",
        component: TweetlistComponent
      }
    ]
  },
  {
    path: "users",
    component: ViewusersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
