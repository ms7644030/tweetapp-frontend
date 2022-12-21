import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { IncomingResponse, TweetEntity } from '../models/incomingdata.model';
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
     if(this.tweet.likes.includes(this.currentUser)){
      this.toggle = false;
      this.status = 'Liked';
     }
  }

  replyToTweet(reply) {
    let currentReply = new Comments();
    currentReply.username = this.currentUser;
    currentReply.timestamp = new Date().toDateString();
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

            //  this.toggle = !this.toggle;
            this.status = this.toggle ? 'Like' : 'Liked';
          } else {
            this.tweet.likes.splice(this.tweet.likes.indexOf(this.currentUser));

            //*ngIf="!tweet.likes.includes(currentUser)"
            //this.tweet.likeCounter -= 1;
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

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Like' : 'Liked';
  }
}
