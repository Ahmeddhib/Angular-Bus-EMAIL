import { Component, OnInit } from '@angular/core';
import {Bus} from '../model/bus.model';
import { AuthService } from '../services/auth.service';
import { BusService } from '../services/bus.service';
import { Image } from '../model/image.model';
@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  buss! : any[]; //un tableau de Bus

  constructor(private busService: BusService,
             public authService: AuthService) {
    //this.buss = busService.listeBus();

             }
      /*supprimerBus(id: number){
      //console.log(bus);
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.busService.supprimerBus(id);
    }*/

  ngOnInit(): void {
    this.busService.listeBus().subscribe(bus => {
      console.log(bus);
      this.buss = bus;
      });

      this.chargerBus();
  }

  chargerBus(){
    this.busService.listeBus().subscribe(bus => {
    
    this.buss = bus;
    this.buss.forEach((bus) => {
      bus.image.image = 'data:' + bus.image.type + ';base64,' + bus.image.image;
     /* this.busService
      .loadImage(bus.image.idImage)
      .subscribe((img: Image) => {
      bus.imageStr = 'data:' + img.type + ';base64,' + img.image;
      });*/
      });
      });

    }

    supprimerBus(bus: Bus)
    {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.busService.supprimerBus(bus.idBus!).subscribe(() => {
    console.log("produit supprimé");
    this.chargerBus();
    });
} 
    


}
