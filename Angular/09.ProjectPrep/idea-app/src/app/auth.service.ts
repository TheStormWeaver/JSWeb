import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('You are logged in.');
        this.router.navigateByUrl('/profile');
      })
      .catch((err) => {
        console.log('Something went wrong: ', err.message);
      });
  }
  
  register(email: string, password: string) {
    this.fireAuth
    .createUserWithEmailAndPassword(email, password)
    .then((value) => {
      console.log('You are now registered.');
      this.router.navigateByUrl('/profile');
    })
    .catch((error ) => {
      console.log('Something went wrong: ', error);
    });
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
