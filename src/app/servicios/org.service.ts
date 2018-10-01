import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  public orgs$: Observable<firebase.User>;
  public orgDetails$: firebase.User = null;
  public orgList$: AngularFireList<any>;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public router: Router
    ) {
    this.orgs$ = firebaseAuth.authState;
    this.orgList$ = this.database.list('/orgs');
    this.orgs$.subscribe(
    (org) => {
      if (org) {
        this.orgDetails$ = org;
      } else {
        this.orgDetails$ = null;
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

  login(email: string, password: string) {
     return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    if (this.orgDetails$ == null ) {
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
