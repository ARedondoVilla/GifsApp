import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;// Toma referencia local #txtBuscar en el html y la asigna a la variable txtBuscar
  // asegura de que txtBuscar no sera null, evitando el error de que da TypeScript

  constructor(private gifsServices: GifsService){} // mediante el constructor genero una variable tipo servicio y me traigo sus metodos
  
  buscar() {
    
    let valor = this.txtBuscar.nativeElement.value;
    // Se le da el valor generico HTMLInputElement para que aparezcan en el autocompletado todas las claves del native element

    if (valor.trim() == "") { // Para evitar que se agreguen valores vacios
      return;
    }
    
    this.gifsServices.buscarGifs(valor)
 
    this.txtBuscar.nativeElement.value = "";
    
    
  }

  // Esto genera en consola el elemento native element de tipo ElementRef
}
