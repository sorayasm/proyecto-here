import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.css']
})
export class OrgProfileComponent implements OnInit {
public orgs$: Observable<any>;
  constructor(public database: AngularFireDatabase) {
  this.orgs$ = this.database.list('/orgs').valueChanges();
   }

  ngOnInit() {
  }

}
