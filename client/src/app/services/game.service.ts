import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Game } from '../interfaces/interfaces';

import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private juegos: Game[] = [];

  constructor(private http: HttpClient) {}

  getGames() {
    if (this.juegos.length > 0) {
      // no tenemos juegos
      console.log('Desde caché');
      return of(this.juegos);
    } else {
      console.log('Desde Internet');
      return this.http
        .get<Game[]>(`${environment.api}/api/goty`)
        .pipe(tap((juegos) => (this.juegos = juegos)));
    }
  }

  votarJuego(id: string) {
    return this.http.post(`${environment.api}/api/goty/${id}`, {}).pipe(
      catchError((err) => {
        return of(err.error);
      })
    );
  }
}
