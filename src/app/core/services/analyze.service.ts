import {Injectable} from '@angular/core';
import {AnalyzedData, VideoItem} from '../models/tiktok.model';
import {RawData} from './file.service';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyzeService {
  constructor() {
  }

  private _countSpentTimeAndSession(watchVideos: VideoItem[]) {
    let sessionCount = 0

    const spentTime = watchVideos.reduce((previousValue, currentValue, currentIndex) => {
      if (currentIndex >= watchVideos.length - 2) {
        sessionCount++
        return previousValue + 15
      }

      const watchedTime = Math.abs(dayjs(currentValue.Date).diff(watchVideos[currentIndex + 1].Date, 'seconds'));
      if (watchedTime > 10 * 60) {
        sessionCount++
        return previousValue + 15;
      }

      return previousValue + watchedTime;
    }, 0)

    return {
      sessionCount,
      spentTime
    }
  }

  private _findMostActiveWeekday(watchVideos: VideoItem[]) {
    const groupByWeekday = watchVideos.reduce((previousValue, currentValue) => {
        const weekday = new Date(currentValue.Date).getDay().toString()
        if (previousValue?.[weekday] === undefined)
          return {
            ...previousValue,
            [weekday]: 1
          }
        return {
          ...previousValue,
          [weekday]: previousValue[weekday] + 1,
        }
      },
      {} as Record<string, number>
    )

    return Object.keys(groupByWeekday).reduce((keyWithMaxValue, currentKey) =>
      groupByWeekday[currentKey] > groupByWeekday[keyWithMaxValue] ? currentKey : keyWithMaxValue
    )
  }

  private _findLongestSession(watchVideos: VideoItem[]) {
    const groupByDate = watchVideos.reduce((previousValue: Record<string, any>, currentValue) => {
        const date = new Date(currentValue.Date).toDateString()
        if (!previousValue?.[date]?.length)
          return {
            ...previousValue,
            [date]: [currentValue]
          }
        return {
          ...previousValue,
          [date]: previousValue[date].push(currentValue),
        }
      },
      {} as Record<string, VideoItem[]>
    )
    return Object.keys(groupByDate).reduce((keyWithMaxValue, currentKey) =>
      groupByDate[currentKey].length > groupByDate[keyWithMaxValue].length ? currentKey : keyWithMaxValue
    )
  }

  analyzeData(rawData: RawData): AnalyzedData {
    const result = new AnalyzedData()

    result.watchedVideosCount = rawData.watchedVideos.length
    result.likedVideoCount = rawData.likedVideos.length
    result.sharedVideoCount = rawData.sharedVideos.length
    result.commentCount = rawData.comments.length

    const {sessionCount, spentTime} = this._countSpentTimeAndSession(rawData.watchedVideos)
    result.watchSessionCount = sessionCount
    result.spentTime = spentTime
    result.averageWatchTime = spentTime / (sessionCount || 1)

    const prevYearFollowerCount = rawData.followers.filter(f => dayjs(f.Date).isBefore(new Date(2024, 1, 1))).length
    const totalFollower = rawData.followers.length
    result.followerGrowth = totalFollower - prevYearFollowerCount

    const prevYearFollowingCount = rawData.followings.filter(f => dayjs(f.Date).isBefore(new Date(2024, 1, 1))).length
    const totalFollowing = rawData.followings.length
    result.followingGrowth = totalFollowing - prevYearFollowingCount

    result.mostActiveWeekday = this._findMostActiveWeekday(rawData.watchedVideos)
    result.longestSession = this._findLongestSession(rawData.watchedVideos)

    return result;
  }

  filterData(source: any[], dateField = 'Date', startTime = new Date(2024, 0, 0), endTime = new Date(2025, 0, 0)): any[] {
    return source.filter(s => {
      const dateInstance = dayjs(s?.[dateField])
      if (!dateInstance.isValid()) {
        return false;
      }

      return dateInstance.isAfter(startTime) && dateInstance.isBefore(endTime);
    });
  }
}
