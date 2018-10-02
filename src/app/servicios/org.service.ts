import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';

export interface OrgProfile {
  email: string;
  uid: string;
  contactname: string;
  contactrut: string;
  orgname: string;
  orgrut: string;
  orgmail: string;
  orgphone: string;
  orgdir: string;
  open: string;
  close: string;
  orgother: string;
}

@Injectable({
  providedIn: 'root'
})


export class OrgService {
  public users$: Observable<firebase.User>;
  public orgDetails$: firebase.User = null;
  public orgList$: AngularFireList<any>;
  public profile: AngularFireList<OrgProfile[]> = null;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public router: Router
    ) {
    // Autenticación
    this.users$ = firebaseAuth.authState;
    this.users$.subscribe(
    (user) => {
      if (user) {
        this.orgDetails$ = user;
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

  createOrg(org: OrgProfile) {
  this.orgList$.push(org);
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
