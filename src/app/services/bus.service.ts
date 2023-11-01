import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from '../model/bus.model';
import { Marque } from '../model/marque.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Image } from '../model/image.model';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
providedIn: 'root'
})
export class BusService {

  apiURL: string = 'http://localhost:8889/buss/api';
  apiURLMar: string = 'http://localhost:8889/buss/api/marque';
  apiURLUser: String ='http://localhost:8886/users'
  /*buss : Bus[];*/
  bus! : Bus;
  user! : User;
  marques! : Marque[];
  busRecherche! : Bus[];
 
  

constructor(private router: Router, private authService: AuthService, private http: HttpClient ) {
  /*this.marques =[ 
      {idMar :1, nomMar : "Iveco Bus"},
      {idMar :2, nomMar : "Mercedes-Benz"}];*/
  /*this.buss = [
      {idBus :1, nomBus : "single-decker", prixBus :110000000.000, dateCreation : new Date("01/14/2011"),marque : {idMar : 1, nomMar : "Iveco Bus"}},
      {idBus :2, nomBus : "double-decker", prixBus :150000000.000, dateCreation : new Date("01/14/2011"),marque : {idMar : 2, nomMar : "Mercedes-Benz"}},
      {idBus :3, nomBus : "minibuses", prixBus :120000000.000, dateCreation : new Date("01/14/2011"),marque : {idMar : 1, nomMar : "Iveco Bus"}},
      {idBus :4, nomBus : "schoolbus", prixBus :100000000.000, dateCreation : new Date("01/14/2011"),marque : {idMar : 2, nomMar : "Mercedes-Benz"}}
  ];*/
  }

    

listeBus(): Observable<Bus[]>{
  /*let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})*/
  return this.http.get<Bus[]>(this.apiURL+"/all");
}


ajouterBus( bus: Bus):Observable<Bus>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Bus>(this.apiURL+"/addbus", bus, {headers:httpHeaders});
}
    

supprimerBus(id : number) {
    const url = `${this.apiURL}/delbus/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});
}
    
    
consulterBus(id: number): Observable<Bus> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Bus>(url,{headers:httpHeaders});
}


updateBus(bus :Bus) : Observable<Bus> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Bus>(this.apiURL+"/updatebus", bus, {headers:httpHeaders});
}


listeMarques():Observable<Marque>{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Marque>(this.apiURLMar+"/all",{headers:httpHeaders}
  );
}

ajouterMarque(mar: Marque):Observable<Marque>{
  return this.http.post<Marque>(this.apiURLMar+"/addmar", mar);
}


consulterMarque(id: number): Observable<Marque>{
  const url = `${this.apiURL}/getbyid/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.get<Marque>(url,{headers:httpHeaders});
}

uploadImage(file: File, filename: string): Observable<Image>{
  const imageFormData = new FormData();
  imageFormData.append('image', file, filename);
  const url = `${this.apiURL + '/image/upload'}`;
  return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
  const url = `${this.apiURL + '/image/get/info'}/${id}`;
  return this.http.get<Image>(url);
  }
  


rechercherParMarque(idMar: number): Observable<Bus[]> {
  const url = `${this.apiURLMar}/busmarque/${idMar}`;
    return this.http.get<Bus[]>(url);
}


rechercherParNom(name: string):Observable< Bus[]> {
  const url = `${this.apiURL}/nomMarque/${name}`;
    return this.http.get<Bus[]>(url);
}

listeUser():Observable<User[]>{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.get<User[]>(this.apiURLUser+"/all",{headers:httpHeaders});
}

ajouterUser(user: { password: any; confirmPassword: any; email: any; username: any }): Observable<User> {
    return this.http.post<User>(this.apiURLUser + "/addUser", user);
}


supprimerUser(id : number) {
  const url = `${this.apiURLUser +"/deleteUser"}/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.delete(url, {headers:httpHeaders});
}

consulterUser(id: number): Observable<User> {
  const url = `${this.apiURLUser +"/getUser"}/${id}`;
  return this.http.get<User>(url);
}

addRoleToUser(id: number, role: Role) {
  const url = `${this.apiURLUser}/addRole/${id}`;
  return this.http.post(url, role);
}

getAllRoles() {
  return this.http.get<Role[]>(this.apiURLUser + '/allRoles');
}
getRoleById(id: number) {
  return this.http.get<Role>(this.apiURLUser + '/role/' + id);
}

removeRoleFromUser(id: number, role: Role) {
  const url = `${this.apiURLUser }/removeRole/${id}`;
  return this.http.post(url, role);
}
getUserById(id: number) {
  return this.http.get<User>(this.apiURLUser + '/getUser/' + id);
}

activateUser(username: string, verificationCode: string): Observable<User> {
  const url = `${this.apiURLUser}/activateUser/${username}/${verificationCode}`;
  const body = { verification_code: verificationCode };
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  console.log(url);
  return this.http.post<User>(url, { headers });
}









/*ajouterBus( buss: Bus){
  this.buss.push(buss);
  this.router.navigate(['/', 'bus'])
}
supprimerBus( b: Bus){
  //supprimer le produit p du tableau bus
  const index = this.buss.indexOf(b,0);
  if (index > -1){
    this.buss.splice(index,1);
  }
}
consulterBus(id:number): Bus{
 return this.bus = this.buss.find(b => b.idBus == id)!;

}

trierBus(){
  this.buss = this.buss.sort((n1,n2) => {
  if (n1.idBus! > n2.idBus!) {return 1;}
  if (n1.idBus! < n2.idBus!) {return -1;}
  return 0;
  });
  }
  updateBus(b:Bus)
  {
  // console.log(p);
  this.supprimerBus(b);
  this.ajouterBus(b);
  this.trierBus();

  }
  listeMarques():Marque[] {
    return this.marques;
    }

  consulterMarque(id:number): Marque{
    return this.marques.find(mar => mar.idMar == id)!;
    }
  rechercherParMarque(idMar : number): Bus[]{
    this.busRecherche = [];
      
    this.buss.forEach((cur,index) =>{
      if (idMar == cur.marque?.idMar){
        console.log("cur "+cur);
        this.busRecherche.push(cur);
      }
    });
    return this.busRecherche;
    
}*/
}






