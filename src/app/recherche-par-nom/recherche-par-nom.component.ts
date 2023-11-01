import { BusService } from './../services/bus.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Bus } from '../model/bus.model';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {
  buss! : Bus[];
  idMar! : number;
  marques! : Marque[];
  allBuss! : Bus[];


  constructor(private AuthService :AuthService,
    private busService : BusService) { }

  ngOnInit(): void {
    this.busService.listeBus();
    //this.marques=this.busService.listeMarques();
    
  }
  onKeyUp(filterText : string){
    console.log(filterText);
    this.buss = this.allBuss.filter(item => item.typeBus?.toLowerCase().includes(filterText));
    }

}
