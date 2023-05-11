import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifts';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private gifList:Gif[] = [];
  private _tagsHistory:string[] = [];
  private apiKey:string = 'n8OVNjXK4OVm28zHIFBH4XbGtpnaFMPd';
  private serviceUrl:string = 'http://api.giphy.com/v1/gifs';
  private keyLocalStorage:string ='history';

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory():string[]
  {
    return [...this._tagsHistory];
  }

  get gifs():Gif[]
  {
    return this.gifList;
  }

  setSearchTag(tag:string):void
  {
    if(tag.length ===0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','12')
      .set('q',tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe(resp=> this.gifList = resp.data);
  }

  private organizeHistory(tag:string):void
  {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !==tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void
  {
    localStorage.setItem(this.keyLocalStorage,JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void
  {
    const history = localStorage.getItem(this.keyLocalStorage) || '[]';
    this._tagsHistory = JSON.parse(history);

    if(this._tagsHistory.length === 0) return;

    this.setSearchTag(this._tagsHistory[0]);
  }
}
