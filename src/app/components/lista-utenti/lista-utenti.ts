import { Component, inject, OnInit, signal} from '@angular/core';
import { UserService } from '../../services/user-service';
import { log } from 'console';

@Component({
  selector: 'app-lista-utenti',
  standalone: false,
  templateUrl: './lista-utenti.html',
  styleUrl: './lista-utenti.css',
})
export class ListaUtenti implements OnInit{

  private userService = inject(UserService)

  utenti = signal<any[]>([])

  loadUsers() {
  this.userService.listAll().subscribe({
    next: (res: any) => this.utenti.set(res),
    error: (res: any) => console.error(res)
  });
}

ngOnInit(): void {
  this.loadUsers();
}

  deleteUser(id: number){
    this.userService.delete(id).subscribe({
      next: (res: any) =>{
        console.log(res);
        this.loadUsers();
        
      },
      error: (res:any) =>{
        console.log(res);
        
      }
    })
  }

}
