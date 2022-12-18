import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  LoginForm,
  RegisterForm,
  Reply,
  TweetForm,
} from './models/userInputForm';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { TweetEntity } from './models/incomingdata.model';
@Injectable({
  providedIn: 'root',
})
export class MainService {
  private PREFIX_PATH: string = 'http://localhost:9001/api/v1.0/tweets/';
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public selectedTweet: TweetEntity;

  constructor(private http: HttpClient) {}

  registerNewUser(data: RegisterForm) {
    return this.http.post(this.PREFIX_PATH + 'register', data, {
      observe: 'response',
    });
  }

  loginUser(data: LoginForm) {
    return this.http.post(this.PREFIX_PATH + 'login', data, {
      observe: 'response',
    });
  }

  resetUserPassword(data: LoginForm) {
    return this.http.post(this.PREFIX_PATH + data.username + '/forgot', data, {
      observe: 'response',
    });
  }

  getAllTweets() {
    return this.http.get(this.PREFIX_PATH + 'all', {
      observe: 'response',
    });
  }

  getAllUsers() {
    return this.http.get(this.PREFIX_PATH + 'users/all', {
      observe: 'response',
    });
  }

  searchByUsername(user: string) {
    return this.http.get(this.PREFIX_PATH + 'user/search/' + user, {
      observe: 'response',
    });
  }

  addTweetForUser(data: TweetForm, jwt: string) {
    let jwttoken = jwt;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: jwttoken,
      }),
    };
    return this.http.post(
      this.PREFIX_PATH + data.loginId + '/add',
      data.tweetText,
      httpOptions
    );
  }

  likeTweet(userId: string, id: number) {
    return this.http.put(
      this.PREFIX_PATH + userId + '/like/' + id,
      {},
      {
        observe: 'response',
      }
    );
  }

  replyTweet(data: Reply, id: number) {
    return this.http.put(
      this.PREFIX_PATH + data.loginId + '/reply/' + id,
      data,
      {
        observe: 'response',
      }
    );
  }

  updateTweet(data: TweetForm, id: number) {
    return this.http.put(
      this.PREFIX_PATH + data.loginId + '/update/' + id,
      data,
      {
        observe: 'response',
      }
    );
  }

  deleteTweet(userId: string, id: number) {
    return this.http.delete(this.PREFIX_PATH + userId + '/delete/' + id, {
      observe: 'response',
    });
  }
}
