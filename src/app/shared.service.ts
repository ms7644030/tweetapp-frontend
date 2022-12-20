import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private jwttoken: string = '';
  private selected: boolean ;
  private username: string;

  constructor() {}

  public setJwtToken(token: string) {
    this.jwttoken = token;
  }

  public getJwtToken(): string {
    return this.jwttoken;
  }

  public setSelected(selected: boolean) {
    this.selected = selected;
  }

  public getSelected(): boolean {
    return this.selected;
  }
  public setUsername(username: string) {
    this.username = username;
  }

  public getUsername(): string {
    return this.username;
  }
}
