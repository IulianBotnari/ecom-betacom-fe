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

  ngOnInit(): void {
    this.userService.listAll().subscribe({
      next: (res: any) => {
       this.utenti.set(res)
        console.log("Utenti caricati " + res);
        
      },
      error: (res:any) => {
        console.log(res);
        
      }
    })
  }

}
