import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { IncomingResponse, TweetEntity } from '../models/incomingdata.model';

@Component({
  selector: 'app-tweetlist',
  templateUrl: './tweetlist.component.html',
  styleUrls: ['./tweetlist.component.css'],
})
export class TweetlistComponent implements OnInit {
 // @ViewChild('scroll') scroll: ElementRef;
  tweetsList: TweetEntity[];
  tweetSelected = false;
  tweet: TweetEntity;
  userNameTweets: string;
  constructor(private service: MainService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.service.getAllTweets().subscribe((response) => {
      if (response.status == 200) {
        this.tweetsList = response.body as TweetEntity[];
        let userName =
          this.route.snapshot.firstChild?.params?.id != null
            ? this.route.snapshot.firstChild.params.id
            : '';
        if (userName != '') {
          this.tweetsList = this.tweetsList.filter(
            (tweet) => tweet.username == userName
          );
        }
      }
    });
  }

  viewTweet(idx) {
    this.tweet = this.tweetsList[idx];
    this.tweetSelected = true;
  }

  deleteTweet(idx) {
    let idsList = this.tweetsList.map((tweet) => tweet.tweetId);
    let currentIdx = idsList.indexOf(idx);
    this.tweetsList.splice(currentIdx, 1);
    this.tweetSelected = false;
    this.tweet = null;
  }

  scrollTop() {
    window.scrollTo(0, 0);

    //this.scroll.nativeElement.scrollTop = 0;
  }
}
