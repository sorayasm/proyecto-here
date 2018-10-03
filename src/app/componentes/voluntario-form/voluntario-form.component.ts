import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VolService, VolProfile } from '../../servicios/vol.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-voluntario-form',
  templateUrl: './voluntario-form.component.html',
  styleUrls: ['./voluntario-form.component.css']
})
export class VoluntarioFormComponent implements OnInit {
  volForm: FormGroup;
  volList$: AngularFireList<any>;

  constructor(public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public router: Router,
    public firebaseAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public volService: VolService) {
      this.createVolForm();
      this.volList$ = this.database.list('/vol');
     }
     createVolForm() {
      this.volForm = this.formBuilder.group({
        name: [''],
        lastname: [''],
        rut: [''],
        age: [''],
        tel: [''],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        detail: [''],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      });
    }
    onRegister() {
      this.volService.signup(this.volForm.value.email, this.volForm.value.password)
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
      addVol() {
        const newVol = {
          name: this.volForm.value.name,
          lastname: this.volForm.value.lastname,
          rut: this.volForm.value.rut,
          age: this.volForm.value.age,
          tel: this.volForm.value.tel,
          email: this.volForm.value.email,
          detail: this.volForm.value.detail,
          password: this.volForm.value.password,
        };
        this.volList$.push(newVol);
        console.log('agregado nuevo voluntario ');
      }
      submit() {
        this.addVol();
        this.onRegister();
        }
      onLogout() {
        return this.volService.logout();
      }
  ngOnInit() {
  }

}
