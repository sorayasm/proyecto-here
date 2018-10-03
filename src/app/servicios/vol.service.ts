import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';

export interface VolProfile {
  name: string;
  lastname: string;
  contactname: string;
  rut: string;
  age: string;
  tel: string;
  email: string;
  detail: string;
  orgdir: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class VolService {
  public users$: Observable<firebase.User>;
  public volDetails$: firebase.User = null;
  public volList$: AngularFireList<any>;
  public profile: AngularFireList<VolProfile[]> = null;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public router: Router
  ) {
    this.users$ = firebaseAuth.authState;
    this.users$.subscribe(
    (user) => {
      if (user) {
        this.volDetails$ = user;
      } else {
        this.volDetails$ = null;
      }
    }
  );
  }
  signup(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('Success!', user);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
  createOrg(org: VolProfile) {
    this.volList$.push(org);
    }
    login(email: string, password: string) {
      return this.firebaseAuth
       .auth
       .signInWithEmailAndPassword(email, password);
   }
   isLoggedIn() {
    if (this.volDetails$ == null ) {
        return false;
      } else {
        return true;
      }
    }
    logout() {
      return this.firebaseAuth.auth.signOut()
          .then((res) => this.router.navigate(['/']));
        }

}
