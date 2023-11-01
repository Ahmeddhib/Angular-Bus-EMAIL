import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusComponent } from './bus/bus.component';
import { AddBusComponent } from './add-bus/add-bus.component';
import { FormsModule } from '@angular/forms';
import { UpdateBusComponent } from './update-bus/update-bus.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { UsersComponent } from './users/users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { VerificationcodeComponent } from './verificationcode/verificationcode.component';



@NgModule({
  declarations: [
    AppComponent,
    BusComponent,
    AddBusComponent,
    UpdateBusComponent,
    LoginComponent,
    ForbiddenComponent,
    RechercheParMarqueComponent,
    RechercheParNomComponent,
    UsersComponent,
    UpdateUserComponent,
    AddUserComponent,
    VerificationcodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}
     ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
