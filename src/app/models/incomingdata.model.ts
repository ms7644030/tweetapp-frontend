import { Reply } from "./userInputForm";
export class TweetEntity {
    tweetId: number;
    userId: string;
    tweetMessage: string;
    timeStamp: string;
    likeCounter: number;

    replies: Reply[];
    userIdLiked: string[];
    tags: [];
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