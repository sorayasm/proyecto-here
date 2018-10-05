
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

export interface Perfil {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {
  authForm: FormGroup;
  value: any;

  perfiles: Perfil[] = [
    {value: 'orgs', viewValue: 'Organización'},
    {value: 'vol', viewValue: 'Voluntario'},
    {value: 'auth', viewValue: 'Solicitante'},
  ];

  // Solicitamos en el constructor todas las cosas necesarias
  constructor(
    private formBuilder: FormBuilder,
    public reactive: ReactiveFormsModule,
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public router: Router) {
    this.createAuthForm();
  }

  ngOnInit() {
  }

  createAuthForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  /*
   * Instalé un módulo para hacer snackbars desde material.angular.io :
   * MatSnackBarModule
   */

  onLogin() {
    this.authService.login(this.authForm.value.email, this.authForm.value.password)
      .then(() => {
        // Login exitoso, así que celebramos con el usuario (?)
      })
      .catch(() => {
        // Algo salió mal, avisemos mejor para que reintente
        this.snackBar.open('Error al tratar de iniciar sesión, trata otra vez'
          , null/*No necesitamos botón en el aviso*/
          , {
            duration: 3000
          });
      });
  }

  onLogout() {
    this.authService.logout()
      .then(() => {
        // Logout exitoso, adios usuario!
        this.router.navigate(['']);
      })
      .catch(() => {
        // Algo salió mal, avisemos mejor para que reintente
        this.snackBar.open('Error al tratar de cerrar sesión, trata otra vez'
          , null/*No necesitamos botón en el aviso*/
          , {
            duration: 3000
          });
      });
  }

  public loginVol() {
    this.onLogin();
    this.router.navigate(['/menu-voluntario']);
  }

  public loginSol() {
    this.onLogin();
    this.router.navigate(['/menu-solicitante']);
  }

  public loginOrg() {
    this.onLogin();
    this.router.navigate(['/menu-org']);
  }

}


