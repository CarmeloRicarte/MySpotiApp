import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  tokenObtenido: string;
  constructor(private http: HttpClient) {
    console.log('Servicio de Spotify listo');
  }

  getToken() {
    // tslint:disable-next-line:max-line-length
    const urlToken = 'https://spotify-get-token.herokuapp.com/spotify/8f5253572a884953be99e467026882fb/5a2ebeeae9fa4f688a7759c3ece7417a';
    return this.http.get(urlToken).pipe(map((token: any) => {
      return token.access_token;
    }));
  }

  getQuery(query: string) {
    // tslint:disable-next-line:max-line-length
    this.getToken()
      .subscribe((token: any) => {
      this.tokenObtenido = token;
      // console.log(token);
      });
    // configuramos las cabeceras con el token de autorización
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders('Authorization: Bearer BQCyIeJzQ-hGFgcFz08pWbKD8i_9uCrS18e5q9DzTQG8AvlrxArjaiZ_6Z_0b5bNur2ijeK0JN2wAf4WIt8');

    // hacemos la petición GET pasándole como opción las cabeceras
    const url = `https://api.spotify.com/v1/${query}`;
    return this.http.get(url, {headers});
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => data['albums'].items));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?query=${termino}&type=artist&market=ES&offset=0&limit=15`)
              .pipe( map (data => data['artists'].items));
  }
  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
      // .pipe( map (data => data['artists'].items));
  }
  getArtistaTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=es`)
      .pipe( map (data => data['tracks']));
  }
}
