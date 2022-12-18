export class RegisterForm {
  emailId: string;
  loginId: string;
  firstName: string;
  lastName: string;
  password: string;
  contactNo: number;
  imageurl: string;
}

export class LoginForm {
  username: string;
  password: string;
}

export class TweetForm {
  loginId: string;
  tweetText: string;
  timeStamp: string;
  likeCounter: number;
  tags: string[];
}

export class Reply {
  loginId: string;
  timeStamp: string;
  comment: string;
}
