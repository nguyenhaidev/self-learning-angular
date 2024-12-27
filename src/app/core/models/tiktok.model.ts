export interface TiktokState {
  watchVideos: VideoItem[]
  watchSession: LoginSession[]
  likedVideos: VideoItem[]
  sharedVideos: SharedVideo[],
  postedVideos: PostedVideo[],
  userInfo: UserInfo | null,
  comments: Comment[],
  followingUsers: FollowingUser[]
  isLoading: boolean
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

export interface FollowingUser {
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
