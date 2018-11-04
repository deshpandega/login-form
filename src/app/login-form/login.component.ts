import {Component} from "@angular/core";

declare const gapi: any;

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class Login{

  private clientId:string = '223586481538-i4td2oobb1e3iuv3d3r4r0drcbqtrfk1.apps.googleusercontent.com';

  public googleAuth: any;
  public isSignedIn: boolean;
  public user: any;

  constructor() {
    this.loadGoogleAuthLib();
  }

  public loadGoogleAuthLib() {
    gapi.load('auth2', () => {
      this.googleAuth = gapi.auth2.init({
        client_id: this.clientId,
        scope: 'profile email'
      });
    });
  }

  public getSignedInUser(){
    this.googleAuth.currentUser.listen((googleUser) => {
      let profile = googleUser.getBasicProfile();

      console.log('-------------------------------');

      //this.user.map()
      this.user = Object.assign({}, this.user,
        {id: profile.getId()},
        {name: profile.getName()},
        {imageUrl: profile.getImageUrl()},
        {email: profile.getEmail()});

      if(googleUser.isSignedIn()){
        this.isSignedIn = true;
      }
    });
  }

  public signOutUser(){
    this.isSignedIn = false;
    this.googleAuth.signOut();
  }

}
