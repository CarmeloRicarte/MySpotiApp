import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SpotifyService} from '../../services/spotify.service';

@Component({
    selector: 'app-artista',
    templateUrl: './artista.component.html',
    styles: []
})
export class ArtistaComponent {

    artista: any = {};
    artistaTopTrack: any[] = [];
    loading: boolean;

    constructor(private router: ActivatedRoute,
                private spotify: SpotifyService) {
        this.router.params.subscribe(params => {
            this.getArtista(params['id']);
            this.getArtistaTopTracks(params['id']);
        });
    }

    async getArtista(id: string) {
        this.loading = true;
        const obs = await this.spotify.getArtista(id);
        obs.subscribe(artista => {
            this.artista = artista;
            this.loading = false;
        });
    }

    async getArtistaTopTracks(id: string) {
        const obs = await this.spotify.getArtistaTopTracks(id);
        obs.subscribe((artistaTopTrack: any) => {
            console.log(artistaTopTrack);
            this.artistaTopTrack = artistaTopTrack;
        });
    }


}
