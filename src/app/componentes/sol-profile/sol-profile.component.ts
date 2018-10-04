import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sol-profile',
  templateUrl: './sol-profile.component.html',
  styleUrls: ['./sol-profile.component.css']
})
export class SolProfileComponent implements OnInit {
  public auth$: Observable<any>;
  constructor(public database: AngularFireDatabase) {
  this.auth$ = this.database.list('/auth').valueChanges();
   }

  ngOnInit() {
  }


}
