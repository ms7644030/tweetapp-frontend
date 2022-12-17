import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { IncomingResponse, TweetEntity } from '../models/incomingdata.model';
import { Reply } from '../models/userInputForm';

@Component({
  selector: 'app-tweetapp',
  templateUrl: './tweetapp.component.html',
  styleUrls: ['./tweetapp.component.css'],
})
export class TweetappComponent implements OnInit {
  @Input('selectedTweet')
  tweet: TweetEntity;

  @Output('delTweet')
  deleteCurrentTweet: EventEmitter<number> = new EventEmitter();

  currentComment = '';
  currentUser: string;

  constructor(private service: MainService, private route: Router) {
    this.currentUser = localStorage.getItem('tweetapp-loggeduser');
  }

  ngOnInit(): void {}

  replyToTweet(reply) {
    let currentReply = new Reply();
    currentReply.userId = this.currentUser;
    currentReply.timeStamp = new Date().toDateString();
    currentReply.comment = reply;
    this.tweet.replies.push(currentReply);
    this.service
      .replyTweet(currentReply, this.tweet.tweetId)
      .subscribe((response) => {
        if (response.status == 200) {
          this.currentComment = '';
        }
      });
  }

  likeTweet(like: boolean) {
    this.service
      .likeTweet(this.currentUser, this.tweet.tweetId)
      .subscribe((response) => {
        if (response.status == 200) {
          if (like) {
            this.tweet.userIdLiked.push(this.currentUser);
            this.tweet.likeCounter += 1;
          } else {
            this.tweet.userIdLiked.splice(
              this.tweet.userIdLiked.indexOf(this.currentUser),
              1
            );
            this.tweet.likeCounter -= 1;
          }
        }
      });
  }

  deleteTweet() {
    this.service
      .deleteTweet(this.currentUser, this.tweet.tweetId)
      .subscribe((response) => {
        if (response.status == 200) {
          this.deleteCurrentTweet.emit(this.tweet.tweetId);
          this.tweet = null;
        }
      });
  }

  editTweet() {
    this.service.selectedTweet = this.tweet;
    this.route.navigate(['/edit/' + this.tweet.tweetId]);
  }
}
