import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;// Toma referencia local #txtBuscar en el html y la asigna a la variable txtBuscar
  // asegura de que txtBuscar no sera null, evitando el error de que da TypeScript
  buscar( textoBuscado: string) {
    
    let valor = this.txtBuscar.nativeElement.value;
    // Se le da el valor generico HTMLInputElement para que aparezcan en el autocompletado todas las claves del native element
    console.log(valor);
    
    
  }

  // Esto genera en consola el elemento native element de tipo ElementRef
}
