import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vol-profile',
  templateUrl: './vol-profile.component.html',
  styleUrls: ['./vol-profile.component.css']
})
export class VolProfileComponent implements OnInit {
  public vol$: Observable<any>;
  constructor(public database: AngularFireDatabase) {
  this.vol$ = this.database.list('/vol').valueChanges();
   }

  ngOnInit() {
  }


}
