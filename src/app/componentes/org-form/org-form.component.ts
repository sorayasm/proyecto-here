import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgService } from '../../servicios/org.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html',
  styleUrls: ['./org-form.component.css']
})
export class OrgFormComponent implements OnInit {
orgForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public router: Router,
    public firebaseAuth: AngularFireAuth,
    public orgService: OrgService) {
    this.createOrgForm();
    }

  ngOnInit() {
  }

  createOrgForm() {
    this.orgForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
     // contactname: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
     // contactrut: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
     // contactemail: ['', Validators.compose([Validators.required, Validators.email])],
     // contactphone: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
     // orgname: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
     // orgrut: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
     // orgmail: ['', Validators.compose([Validators.required, Validators.email])],
     // orgphone: ['', Validators.compose([Validators.required, Validators.minLength(9)])],
     // orgdir: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  onRegister() {
  this.orgService.signup(this.orgForm.value.email, this.orgForm.value.password)
  .then(() => {
  // Registro exitoso. Ingresemos los datos a la base de Datos y redireccionamos al login
  this.router.navigate(['/wall']);
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

  onLogout() {
  return this.orgService.logout();
  }
}
