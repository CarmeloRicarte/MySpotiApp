import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Servicio de Spotify listo');
  }

  getToken() {
    // tslint:disable-next-line:max-line-length
    const url = 'https://spotify-get-token.herokuapp.com/spotify/8f5253572a884953be99e467026882fb/0373d5d155f240e8a21839737d355170';
    const prom = this.http.get(url).toPromise().then((data: any) => data.access_token);
    return prom;
  }

  async getQuery(query: string) {
    const token = await this.getToken();
    const url = `https://api.spotify.com/v1/${query}`;
    // configuramos las cabeceras con el token de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // hacemos la petición GET pasándole como opción las cabeceras
    return this.http.get(url, {headers});
  }

  async getNewReleases() {
    const obs = await this.getQuery('browse/new-releases?limit=20');
    return obs.pipe(map((data: any) => data.albums.items));
  }

  async getArtistas(termino: string) {
    const obs = await this.getQuery(`search?query=${termino}&type=artist&market=ES&offset=0&limit=15`);
    return obs.pipe( map (data => data['artists'].items));
  }
  async getArtista(id: string) {
    const obs = await this.getQuery(`artists/${id}`);
    return obs;
      // .pipe( map (data => data['artists'].items));
  }
  async getArtistaTopTracks(id: string) {
    const obs = await this.getQuery(`artists/${id}/top-tracks?country=es`);
    return obs.pipe( map (data => data['tracks']));
  }
}
