import { Component } from '@angular/core';
import { GifModule } from 'src/app/gifts/gif.module';
import { GifService } from 'src/app/gifts/services/gif.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private giftService:GifService){}

  get tagsHistory():string[]
  {
    return this.giftService.tagsHistory;
  }

  searchByTag(tag:string):void
  {
    this.giftService.setSearchTag(tag);
  }
}
