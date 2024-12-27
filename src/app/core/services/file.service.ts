import {Injectable} from '@angular/core';
import JSZip from 'jszip';
import {Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {Store} from '@ngrx/store';
import {ActivityTypes, DataTypes} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private store: Store<AppState>) {
  }

  readData(file: any): Observable<any> {
    return new Observable((subscriber) => {
      (async () => {
        try {
          const zip = await JSZip.loadAsync(file)
          const jsonRaw = await zip.file('user_data_tiktok.json')?.async('string')
          if (!jsonRaw) {
            subscriber.error(new Error('Can not read content of data'))
            return
          }
          const jsonContent = JSON.parse(jsonRaw);
          console.log(jsonContent);
          const watchedVideos = jsonContent?.[DataTypes.ACTIVITY]?.[ActivityTypes.VIDEO_HISTORY]?.VideoList
          const userInfo = jsonContent?.[DataTypes.PROFILE]?.['Profile Information']?.ProfileMap

          subscriber.next({
            watchVideos: watchedVideos,
            userInfo: userInfo
          })
        } catch (error) {
          subscriber.error(error);
        }
      })();
    });
  }
}
