import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService, OrgProfile } from '../../servicios/org.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html',
  styleUrls: ['./org-form.component.css']
})

export class OrgFormComponent implements OnInit {
orgForm: FormGroup;
orgList$: AngularFireList<any>;
events: string[] = [];
form;
controlNames;
selectedNames$;


  constructor(
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public router: Router,
    public firebaseAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public orgService: OrgService) {
    this.createOrgForm();
    this.orgList$ = this.database.list('/orgs');
    }

  createOrgForm() {
    this.orgForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      contactname: [''],
      contactrut: [''],
      orgname: [''],
      orgrut: [''],
      orgphone: [''],
      orgdir: [''],
      orgcenters: [''],
      open: [''],
      close: [''],
      orgother: ['']
    });
  }

  onRegister() {
  this.orgService.signup(this.orgForm.value.email, this.orgForm.value.password)
  .then(() => {
  // Registro exitoso.
    console.log('registro exitoso');
  })
  .catch(() => {
  // Algo salió mal, avisemos mejor para que reintente
  this.snackBar.open('Error de registro, trata otra vez'
    , null/*No necesitamos botón en el aviso*/
    , {
      duration: 3000
    });
  });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  addOrg() {
    const newOrg = {
      email: this.orgForm.value.email,
      uid: this.firebaseAuth.auth.currentUser.uid,
      contactname: this.orgForm.value.contactname,
      contactrut: this.orgForm.value.contactrut,
      orgname: this.orgForm.value.orgname,
      orgrut: this.orgForm.value.orgrut,
      orgphone: this.orgForm.value.orgphone,
      // orgcenter: '',
      open: this.events.entries,
      close: '',
      orgdir: this.orgForm.value.orgdir
    };
    this.orgList$.push(newOrg);
    console.log('agregada nueva org');
  }

  submit() {
  this.onRegister();
  this.addOrg();
  this.router.navigate(['/wall']);
  }

  ngOnInit() {
  }
}
