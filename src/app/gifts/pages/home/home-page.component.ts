import { Component } from '@angular/core';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gifts';

@Component({
  selector: 'gifts-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  constructor(private gifService:GifService){}

  get gifs():Gif[]{
    return this.gifService.gifs;
  }
}
