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
      checkRefugio: [''],
      checkCentro: [''],
      checkTransporte: [''],
      checkEntrega: [''],
      checkPrimeros: [''],
      close: [''],
      nvol: [''],
      orgother: [''],
      check1 : [''],
      check2: [''],
      check3: ['']
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
      contactname: this.orgForm.value.contactname,
      contactrut: this.orgForm.value.contactrut,
      orgname: this.orgForm.value.orgname,
      orgrut: this.orgForm.value.orgrut,
      orgphone: this.orgForm.value.orgphone,
      orgdir: this.orgForm.value.orgdir,
      checkRefugio: this.orgForm.value.checkRefugio,
      checkCentro: this.orgForm.value.checkCentro,
      checkTransporte: this.orgForm.value.checkTransporte,
      checkCEntrega: this.orgForm.value.checkEntrega,
      checkPrimeros: this.orgForm.value.checkPrimeros,
      close: this.orgForm.value.close,
      nvol: this.orgForm.value.nvol,
      check1: this.orgForm.value.check1,
      check2: this.orgForm.value.check2,
      check3: this.orgForm.value.check3
    };
    this.orgList$.push(newOrg);
    console.log('agregada nueva org');
  }

  submit() {
  this.onRegister();
  this.addOrg();
  this.router.navigate(['/login']);
  }

  ngOnInit() {
  }
}
