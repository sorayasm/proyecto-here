import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VoluntarioFormComponent } from './componentes/voluntario-form/voluntario-form.component';
import { HomeComponent } from './componentes/home/home.component';
<<<<<<< HEAD
import { LoginComponent } from './componentes/login/login.component';

// import de material angular scar
import {MatButtonModule} from '@angular/material/button';
=======
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
>>>>>>> 35d247e09ee9253468df6a24420ebb84ade7a60d

@NgModule({
  declarations: [
    AppComponent,
    VoluntarioFormComponent,
    HomeComponent,
    LoginComponent,
    MatButtonModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
