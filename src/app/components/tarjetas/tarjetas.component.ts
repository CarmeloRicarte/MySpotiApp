import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: []
})
export class TarjetasComponent {
  @Input() items: any[] = [];
  constructor(private _router: Router) { }

  verArtista(item: any) {
    let artistaId;
/*
    si es un artista cogemos el id y si es un álbum
    cogemos el id del 1er artista
*/
    if (item.type === 'artist'){
      artistaId= item.id;
    } else {
      artistaId = item.artists[0].id;
    }
    this._router.navigate(['/artist', artistaId]);
  }
}
