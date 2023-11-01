import { Marque } from './../model/marque.model';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../services/bus.service';
import { Bus } from '../model/bus.model';
import { Image } from '../model/image.model';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-update-bus',
templateUrl: './update-bus.component.html',
styles: []
})
export class UpdateBusComponent implements OnInit {
 
currentBus = new Bus();
marques : Marque[]= [];
updatedMarId! : number;
marque! : any;
myImage! : string;
uploadedImage!: File;
isImageUpdated: Boolean=false;






constructor(private activatedRoute: ActivatedRoute,
  private router :Router,
  private busService: BusService) { }

  ngOnInit() {

    this.busService.consulterBus(this.activatedRoute.snapshot.params['id']).
 subscribe( bus =>{ this.currentBus = bus; } ) ;


    this.busService.listeMarques().
    subscribe(marques => {this.marque = marques;
    console.log(marques);
    });
    this.busService.consulterBus(this.activatedRoute.snapshot.params['id']).
    subscribe( marques =>{ this.currentBus = marques;
    this.updatedMarId =
    this.currentBus.marque.idMarque;

    this.busService
    .loadImage(this.currentBus.image.idImage)
    .subscribe((img: Image) => {
    this.myImage = 'data:' + img.type + ';base64,' + img.image;
    }); 
    } ) ;
  }

//     onImageUpload(event: any) {
//       if(event.target.files && event.target.files.length) {
//       this.uploadedImage = event.target.files[0];
//       this.isImageUpdated =true;
//       const reader = new FileReader();
//       reader.readAsDataURL(this.uploadedImage);
//       reader.onload = () => { this.myImage = reader.result as string; };
//       }
//       }
      








//  }

//   updateBus() {
//     this.currentBus.marque = this.marque.find(marque => marque.idMarque == this.updatedMarId)!;
//       //tester si l'image du produit a été modifiée
//       if (this.isImageUpdated)!
//       {
//       this.busService
//       .uploadImage(this.uploadedImage, this.uploadedImage.name)
//       .subscribe((img: Image) => {
//       this.currentBus.image = img;
//       this.busService
//       .updateProduit(this.currentBus)
//       .subscribe((marque) => {
//       this.router.navigate(['bus']);
//       });
//       });
//       }
//       else{
//       this.busService
//       .updateProduit(this.currentBus)
//       .subscribe((marque) => {
//       this.router.navigate(['bus']);
//       });
//       }


      updateBus() {
        this.currentBus.marque = this.marque.find(marque => marque.idMarque === this.updatedMarId)!;
        
        // Tester si l'image du produit a été modifiée
        if (this.isImageUpdated) {
          this.busService.uploadImage(this.uploadedImage, this.uploadedImage.name)
            .subscribe((img: Image) => {
              this.currentBus.image = img;
              this.currentBus.marque = this.marque.find(marque => marque.idMarque == this.updatedMarId)!;
              this.busService.updateBus(this.currentBus)
                .subscribe((marque) => {
                  this.router.navigate(['bus']);
                });
            });
        } else {
          this.busService.updateBus(this.currentBus)
            .subscribe((marque) => {
              this.router.navigate(['bus']);
            });
        
      }
    }

      onImageUpload(event: any) {
        if (event.target.files && event.target.files.length) {
          this.uploadedImage = event.target.files[0];
          this.isImageUpdated = true;
          const reader = new FileReader();
          reader.readAsDataURL(this.uploadedImage);
          reader.onload = () => { this.myImage = reader.result as string; };
        }
      }
      
      
    
}
    

