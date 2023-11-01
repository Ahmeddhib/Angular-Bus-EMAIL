import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';
import {AuthService} from "../services/auth.service";
import { BusService } from '../services/bus.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users? : User[];
  roles?: Role[];
  constructor(public authService: AuthService, private busService: BusService) {}

  ngOnInit(): void {
    this.listeUser();
  }

  listeUser(): void {
    this.busService.listeUser().subscribe((users: User[]) => {
      this.users = users;
    });
  }



  supprimerUser(u: User) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        // L'utilisateur a confirmé la suppression, effectuez l'action ici.
        this.busService.supprimerUser(u.user_id!).subscribe(() => {
          console.log("Utilisateur supprimé");
          this.listeUser();
        });
      }
    });
  }

}

