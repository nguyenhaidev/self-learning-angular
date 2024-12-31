import {Injectable} from '@angular/core';
import JSZip from 'jszip';
import {Observable} from 'rxjs';
import {ActivityTypes, DataTypes} from '../../utils/constants';
import {Comment, FollowInfo, UserInfo, UserVideo, VideoItem} from '../models/tiktok.model';
import {AnalyzeService} from './analyze.service';

export interface RawData {
  watchedVideos: VideoItem[]
  userInfo: UserInfo | null
  likedVideos: VideoItem[]
  sharedVideos: VideoItem[]
  comments: Comment[]
  followers: FollowInfo[]
  followings: FollowInfo[]
  userVideos: UserVideo[]
}


@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private analyzeService: AnalyzeService) {
  }

  readData(file: any): Observable<RawData> {
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

          // Activities data
          const activities = jsonContent?.[DataTypes.ACTIVITY]
          const watchedVideos: VideoItem[] = activities?.[ActivityTypes.VIDEO_HISTORY]?.VideoList
          const likedVideos: VideoItem[] = activities?.[ActivityTypes.LIKE_LIST]?.ItemFavoriteList
          const sharedVideos: VideoItem[] = activities?.[ActivityTypes.SHARE_HISTORY]?.ShareHistoryList
          const followers: FollowInfo[] = activities?.[ActivityTypes.FOLLOWER_LIST]?.FansList
          const followings: FollowInfo[] = activities?.[ActivityTypes.FOLLOWING_LIST]?.Following

          // User information
          const userInfo: UserInfo = jsonContent?.[DataTypes.PROFILE]?.[DataTypes.PROFILE_INFO]?.ProfileMap

          // Comments
          const comments: Comment[] = jsonContent?.[DataTypes.COMMENT]?.Comments?.CommentsList!

          // User video
          const userVideos: UserVideo[] = jsonContent?.[DataTypes.VIDEO].Videos.VideoList
          console.log(jsonContent)
          const result = {
            watchedVideos: this.analyzeService.filterData(watchedVideos),
            userInfo,
            likedVideos: this.analyzeService.filterData(likedVideos),
            sharedVideos: this.analyzeService.filterData(sharedVideos),
            comments: this.analyzeService.filterData(comments),
            // followers: this.analyzeService.filterData(followers),
            followers,
            followings,
            userVideos: this.analyzeService.filterData(userVideos),
          }
          subscriber.next(result)
        } catch (error) {
          subscriber.error(error);
        }
      })();
    });
  }

}
