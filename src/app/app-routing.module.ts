import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusComponent } from './bus/bus.component';
import { AddBusComponent } from './add-bus/add-bus.component';
import { UpdateBusComponent } from './update-bus/update-bus.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { BusGuard } from './bus.guard';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UsersComponent } from './users/users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { VerificationcodeComponent } from './verificationcode/verificationcode.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
{path: "bus", component : BusComponent},
{path: 'add-bus', component: AddBusComponent, canActivate:[BusGuard]},
{path: "", redirectTo: "bus", pathMatch:"full"},
{path: "updateBus/:id", component: UpdateBusComponent},
{path: 'updatebus/:id',component: UpdateBusComponent},
{path: 'login', component: LoginComponent},
{path: 'app-forbidden', component: ForbiddenComponent},
{path: "rechercheParMarque", component : RechercheParMarqueComponent},  
{path: "rechercheParNom", component : RechercheParNomComponent},
{path: "listeUser",component: UsersComponent,canActivate:[BusGuard]},
{path: "updateUser/:id",component:UpdateUserComponent},
{path: "verificationcode", component: VerificationcodeComponent},
{path:"ajouterUser",component:AddUserComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
