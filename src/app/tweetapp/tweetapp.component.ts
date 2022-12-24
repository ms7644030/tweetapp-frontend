import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { TweetEntity } from '../models/incomingdata.model';
import { Comments } from '../models/userInputForm';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-tweetapp',
  templateUrl: './tweetapp.component.html',
  styleUrls: ['./tweetapp.component.css'],
})
export class TweetappComponent implements OnInit {
  @Input('selectedTweet')
  tweet: TweetEntity;

  @Output('delTweet')
  deleteCurrentTweet: EventEmitter<String> = new EventEmitter();

  currentComment = '';
  currentUser: string;
  liked: boolean = false;

  toggle: boolean = true;
  status: string = 'Like';

  constructor(
    private service: MainService,
    private route: Router,
    private shared: SharedService
  ) {
    this.currentUser = localStorage.getItem('tweetapp-loggeduser');
  }

  ngOnInit(): void {
    if (this.tweet.likes.includes(this.currentUser)) {
      this.toggle = false;
      this.status = 'Liked';
    }
  }

  replyToTweet(reply) {
    let currentReply = new Comments();
    currentReply.username = this.currentUser;
    let d = new Date();
    let dformat =
      [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('-') +
      ' ' +
      [d.getHours(), d.getMinutes()].join(':');
    currentReply.timestamp = dformat;
    currentReply.comment = reply;
    this.tweet.replies.push(currentReply);
    this.service
      .replyTweet(
        this.currentUser,
        this.tweet.tweetId,
        currentReply,
        this.shared.getJwtToken()
      )
      .subscribe((data) => {
        if (data == 'Replied') {
          this.currentComment = '';
        }
      });
  }

  likeTweet(like: boolean) {
    if (like) {
      this.tweet.likes.push(this.currentUser);
    } else {
      this.tweet.likes.splice(this.tweet.likes.indexOf(this.currentUser));
    }

    this.service
      .likeTweet(
        this.currentUser,
        this.tweet.tweetId,
        this.shared.getJwtToken()
      )
      .subscribe((data) => {
        if (data == 'liked tweet') {
          if (like) {
            this.tweet.likes.push(this.currentUser);
          } else {
            this.tweet.likes.splice(this.tweet.likes.indexOf(this.currentUser));
          }
        }
      });
  }

  deleteTweet() {
    this.service
      .deleteTweet(
        this.currentUser,
        this.tweet.tweetId,
        this.shared.getJwtToken()
      )
      .subscribe((data) => {
        if (data == 'Tweet deleted successfully') {
          this.deleteCurrentTweet.emit(this.tweet.tweetId);
          this.tweet = null;
          this.route.navigate(['/tweets/']);
        }
      });
  }

  editTweet() {
    this.service.selectedTweet = this.tweet;
    this.route.navigate(['/edit/' + this.tweet.tweetId]);
  }
}
