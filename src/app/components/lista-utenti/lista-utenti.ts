import { Component, inject, OnInit, Output, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { log } from 'console';

@Component({
  selector: 'app-lista-utenti',
  standalone: false,
  templateUrl: './lista-utenti.html',
  styleUrl: './lista-utenti.css',
})
export class ListaUtenti implements OnInit {
  private userService = inject(UserService);

  utenti = signal<any[]>([]);
  userUpdateId = signal<any | null>(null);

  loadUsers() {
    this.userService.listAll().subscribe({
      next: (res: any) => this.utenti.set(res),
      error: (res: any) => console.error(res),
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

 deleteUser(id: number) {
  if (confirm("Sei sicuro di voler eliminare questo utente? L'azione è irreversibile.")) {
    this.userService.delete(id).subscribe({
      next: (res: any) => {
        console.log("Eliminato con successo");
        this.loadUsers();
      },
      error: (err: any) => console.error(err)
    });
  }
}

  userUpdate(id: number) {
    if (this.userUpdateId() == null) {
       this.userUpdateId.set(id);
    } else{
      this.userUpdateId.set(null)
    }
   
  }
}
