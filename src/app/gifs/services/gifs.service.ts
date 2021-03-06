import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "CFZ9grM87gaiStZ3XycDqRsjc9f1Bv5p";
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";

  private _historial: string[] = [];

  public resultados: Data[] = [];
  
  
  get historial() {
    return [...this._historial];
  }

  constructor(private http:HttpClient) {

    if (localStorage.getItem('Historial')) {
      this._historial = JSON.parse(localStorage.getItem('Historial')!) // El ! se usa para saltar el error de tipado de Typescript, ya que tiene una validacion anterior
    }

    if (localStorage.getItem('Resultados')) {
      this.resultados = JSON.parse(localStorage.getItem('Resultados')!) // El ! se usa para saltar el error de tipado de Typescript, ya que tiene una validacion anterior
    }
  }

  buscarGifs(query: string) {

    // Para crear una baseUrl
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    console.log("Esto son los params",params.toString()); // lo pasamos a string para que pierda la forma del objeto y tome de url
    

    // Manda la peticion a la API y lo almacenamos en la variable resultados (Esto es lo que estaria en el flux)
    // this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=CFZ9grM87gaiStZ3XycDqRsjc9f1Bv5p&q=${query}&limit=10`)
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe((response) => { 
      // console.log(response.data);
      this.resultados = response.data
      console.log(this.resultados);
      localStorage.setItem('Resultados', JSON.stringify(this.resultados))
    });

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=CFZ9grM87gaiStZ3XycDqRsjc9f1Bv5p&q=ironman&limit=10')
    // .then(response => {
    //   response.json().then(data => {
    //     console.log(data.data);
    //   })
    // })
    

    // Modifica la variabl de entrada y la inserta dentro del historial de busqueda
    query = query.trim().toLowerCase();

    if (this._historial.includes(query)) {
      return;
    }

    this._historial.unshift(query);

    this._historial = this._historial.splice(0,9); // Para que solo aparezcan los ultimos 10 elementos buscados

    localStorage.setItem('Historial', JSON.stringify(this._historial))

    console.log(this._historial);  

  }

  
  
}
