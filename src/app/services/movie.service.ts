import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  //On affiche la liste des films dispo depuis l'api
  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
  }

  //on récupère la liste des films depuis un id pour en afficher son détail
  getMovieDetails(id: string) {
    return this.http.get(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }
}
