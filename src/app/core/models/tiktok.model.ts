export class AnalyzedData implements IAnalyzedData {
  averageWatchTime: number;
  commentCount: number;
  followerGrowth: number;
  followingGrowth: number;
  likedVideoCount: number;
  longestSession: string;
  mostActiveWeekday: string;
  sharedVideoCount: number;
  spentTime: number;
  watchSessionCount: number;
  watchedVideosCount: number;

  constructor() {
    this.averageWatchTime = 0;
    this.commentCount = 0;
    this.followerGrowth = 0;
    this.followingGrowth = 0;
    this.likedVideoCount = 0;
    this.longestSession = '';
    this.mostActiveWeekday = '';
    this.sharedVideoCount = 0;
    this.spentTime = 0;
    this.watchSessionCount = 0;
    this.watchedVideosCount = 0;
  }
}

export interface IAnalyzedData {
  spentTime: number
  commentCount: number
  likedVideoCount: number
  sharedVideoCount: number
  mostActiveWeekday: string
  watchedVideosCount: number
  followerGrowth: number
  followingGrowth: number
  averageWatchTime: number
  longestSession: string
  watchSessionCount: number
}

export interface SharedVideo extends VideoItem {
  Method: string
}

export interface LoginSession {
  Date: string
  DeviceModel: string
  DeviceSystem: string
}

export interface VideoItem {
  Date: string
  Link: string
}

export interface FollowInfo {
  Date: string
  UserName: string
}

export interface Comment {
  Date: string
  Comment: string
}

export interface UserInfo {
  userName: string
  likesReceived: string
}

export interface PostedVideo extends VideoItem {
  Liked: number
}

export interface UserVideo extends VideoItem {
  AIGeneratedContent: string
  Likes: number
  Title: string
}
