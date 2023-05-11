import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'gifts-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

  public tag!:string;

  constructor(private service:GifService){}

  searchTag():void{
    this.service.setSearchTag(this.tag);
    this.tag = '';
  }
}
