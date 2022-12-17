import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private jwttoken: string = '';

  constructor() {}

  public setJwtToken(token: string) {
    this.jwttoken = token;
  }

  public getJwtToken(): string {
    return this.jwttoken;
  }
}
