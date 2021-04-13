import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
 
})
export class SidebarComponent {

  constructor(private gifsServices: GifsService) { }

  get historialToSideBar() {
    return this.gifsServices.historial
  }

  buscar(value: string) {
    console.log(value);
    this.gifsServices.buscarGifs(value);
    
  }

}


