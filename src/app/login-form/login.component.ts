import {AfterViewInit, Component} from '@angular/core';
import GoogleUser = gapi.auth2.GoogleUser;
import {Service} from '../service';

declare const gapi: any;

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {

  private clientId = '<GOOGLE_CLIENT_ID>';

  public googleAuth: any;
  public isSignedIn: boolean;
  public user: any;
  private googleUser: any;

  constructor(private userService: Service) {
  }

  ngAfterViewInit() {
    this.loadGoogleAuthLib();
  }

  public loadGoogleAuthLib() {
    gapi.load('auth2', () => {
      this.googleAuth = gapi.auth2.init({
        client_id: this.clientId,
        scope: 'profile email'
      });
      this.getSignedInUser(document.getElementById('googleLoginBtn'));
    });
  }

  public getSignedInUser(element) {
      this.googleAuth.attachClickHandler(element, {}, (googleUser: GoogleUser) => {
        if (this.isSignedIn === undefined) {
          this.googleUser = googleUser;
          this.isSignedIn = this.googleUser.isSignedIn();
          const profile = googleUser.getBasicProfile();

          this.user = Object.assign({}, this.user,
            {id: profile.getId()},
            {name: profile.getName()},
            {imageUrl: profile.getImageUrl()},
            {email: profile.getEmail()});

          alert('Welcome ' + this.user.name);
          this.userService.sendDataToDb(this.user, 'google');
        } else {
          this.googleAuth.signOut();
          this.isSignedIn = undefined;
          alert('Sign Out Successfully');
        }
      }, (error) => {
        console.log(error);
      });
  }

}
