import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrls: ['./solicitante.component.css']
})
export class SolicitanteComponent implements OnInit {
  authForm: FormGroup;
  authList$: AngularFireList<any>;

  constructor(public formBuilder: FormBuilder,
   public authService: AuthService,
   public snackBar: MatSnackBar,
   public router: Router,
   public firebaseAuth: AngularFireAuth,
   public database: AngularFireDatabase) {
   const user = this.firebaseAuth.auth.currentUser;
   // console.log(user);
   this.createAuthForm();
   this.authList$ = this.database.list('/auth');
  }

  ngOnInit() {
  }

  createAuthForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

 onRegister() {
 this.authService.signup(this.authForm.value.email, this.authForm.value.password)
 .then(() => {
   // Registro exitoso. Ingresemos los datos a la base de Datos y redireccionamos al login
   this.router.navigate(['/navbar']);
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

 addAuth() {
  const newAuth = {
    email: this.authForm.value.email,
    password: this.authForm.value.password,
  };
  this.authList$.push(newAuth);
  console.log('agregado nuevo voluntario ');
}
submit() {
  this.addAuth();
  this.onRegister();
  }

 onLogout() {
  return this.authService.logout();
 }
}
