import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<firebase.User>;
  public userList$: AngularFireList<any>;

  constructor( public firebaseAuth: AngularFireAuth, public database: AngularFireDatabase, public router: Router ) {
    this.user = firebaseAuth.authState;
    this.userList$ = this.database.list('/users');
  }

  signup(email: string, password: string) {
    return this.firebaseAuth
    .auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log('Success!', user);
      const newUser = {
        email: email,
        uid: user.user.uid,
        username: email,
      };
      this.userList$.push(newUser);
    });
  }

  login(email: string, password: string) {
    return this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }
}
