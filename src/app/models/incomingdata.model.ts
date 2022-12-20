import { Comments } from "./userInputForm";

export class TweetEntity {
    // tweetId: number;
    // userId: string;
    // tweetMessage: string;
    // timeStamp: string;
    // likeCounter: number;

    // replies: Reply[];
    // userIdLiked: string[];
    // tags: [];
     tweetId: string;
     username: string;
      tweetText: string;
     firstName: string;
    lastName: string;
     tweetDate: string;
//    @Embedded
//    private ProfileImage profileImage;
     imageurl:  string;
     likes :string[];
     replies:Comments[];
}

export class UserEntity {
    firstName: string;
    lastName: string;
    userId: string;
    email: string;
    contactNumber: number;
}

export interface IncomingResponse {
    code: number;
    status: string;
    message: any;
}