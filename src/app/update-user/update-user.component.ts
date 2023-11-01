import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../services/bus.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  
  constructor(
    private busService: BusService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ) { }
  user: User = new User(); // Initialize with an empty user object
  users: User[] = [];
  role!: Role;
  roles: Role[] = [];
  roleId!: number;
  newRole!: Role;
  oldRole!: Role;
  currentUser = new User();

ngOnInit(): void {
  this.loadUserAndRoles();
}

loadUserAndRoles() {
  this.busService.listeUser().subscribe((users) => {
    this.users = users;
  });

  this.busService
    .getUserById(this.activatedRoute.snapshot.params['id'])
    .subscribe((user) => {
      this.user = user;
    });

  this.busService.getAllRoles().subscribe((roles) => {
    this.roles = roles;
  });
}

addRoleToUser() {
  this.busService
    .addRoleToUser(this.user.user_id, this.newRole)
    .subscribe((data) => {
      console.log('Role added to user');
      this.user.roles.push(this.newRole); // Add the new role to the user's roles
    });
}

removeRoleFromUser(id: number) {
  console.log('ROLE ID: ' + id);
  this.busService.getRoleById(id).subscribe((role) => {
    this.roleId = role.role_id;
    this.oldRole = role;
    console.log('OLD ROLE: ' + this.oldRole);
    this.busService
      .removeRoleFromUser(this.user.user_id, this.oldRole)
      .subscribe((data) => {
        console.log('Role removed from user');
        // Remove the role from the user's roles array
        this.user.roles = this.user.roles.filter(
          (userRole) => userRole.role_id !== id
        );
      });
  });
}



confirmAddRole() {
  if (!this.user.roles.find(role => role.role === this.newRole.role)) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment ajouter ce rôle ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Ajoutez ici la logique pour ajouter le rôle
        // Si l'utilisateur a confirmé
        // Vous pouvez appeler la fonction addRoleToUser() ici
        this.addRoleToUser();
        Swal.fire('Succès', 'User modified', 'success').then(() => {
          // Rediriger vers la liste des utilisateurs et forcer le rechargement de la page
          this.router.navigate(['/listeUser'], { skipLocationChange: true }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  } else {
    // Si le rôle est identique, vous pouvez afficher un message sans SweetAlert
    Swal.fire('Info', 'Aucune modification apportée', 'info');
  }
}


confirmDeleteRole(roleId) {
  Swal.fire({
    title: 'Confirmation',
    text: 'Voulez-vous vraiment supprimer ce rôle ?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Oui',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      // Ajoutez ici la logique pour supprimer le rôle
      // Si l'utilisateur a confirmé
      // Vous pouvez appeler la fonction removeRoleFromUser(roleId) ici
      this.removeRoleFromUser(roleId);
    }
  });
}
}
