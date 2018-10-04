import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sol-profile',
  templateUrl: './sol-profile.component.html',
  styleUrls: ['./sol-profile.component.css']
})
export class SolProfileComponent implements OnInit {
  public users$: Observable<any>;
  constructor(public database: AngularFireDatabase) {
  this.users$ = this.database.list('/users').valueChanges();
   }

  ngOnInit() {
  }


}
