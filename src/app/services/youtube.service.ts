import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl='https://youtube.googleapis.com/youtube/v3';
  private apiKey='AIzaSyDiczQf8A_jBOgWY37W1alKCPRyDPIn1rE';
  private playList='UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken='';

  constructor(private http: HttpClient) { 

  }

  getVideos(){

    const url= `${this.youtubeUrl}/playlistItems`;
    const params= new HttpParams()
                      .set('part','snippet')
                      .set('playlistId',this.playList)
                      .set('maxResults','10')
                      .set('key',this.apiKey)
                      .set('pageToken',this.nextPageToken);

    return this.http.get<YoutubeResponse>(url,{params: params}).pipe(
      map(resp =>{
        this.nextPageToken= resp.nextPageToken;
        return resp.items;
      }),
      map( items =>{
        return items.map(video => video.snippet);
      })
    );
  }
}
