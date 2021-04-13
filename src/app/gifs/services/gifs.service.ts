import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "CFZ9grM87gaiStZ3XycDqRsjc9f1Bv5p";

  private _historial: string[] = [];

  public resultados: Data[] = [];
  
  
  get historial() {
    return [...this._historial];
  }

  constructor(private http:HttpClient) {
    if (localStorage.getItem('Historial')) {
      this._historial = JSON.parse(localStorage.getItem('Historial')!) // El ! se usa para saltar el error de tipado de Typescript, ya que tiene una validacion anterior
    }
  }

  buscarGifs(query: string) {
    
    query = query.trim().toLowerCase();

    if (this._historial.includes(query)) {
      return;
    }

    this._historial.unshift(query);

    this._historial = this._historial.splice(0,9); // Para que solo aparezcan los ultimos 10 elementos buscados

    localStorage.setItem('Historial', JSON.stringify(this._historial))

    console.log(this._historial);

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=CFZ9grM87gaiStZ3XycDqRsjc9f1Bv5p&q=ironman&limit=10')
    // .then(response => {
    //   response.json().then(data => {
    //     console.log(data.data);
    //   })
    // })

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=CFZ9grM87gaiStZ3XycDqRsjc9f1Bv5p&q=${query}&limit=10`)
    .subscribe((response) => { 
      // console.log(response.data);
      this.resultados = response.data
      console.log(this.resultados);
      
    });

  }

  
  
}
