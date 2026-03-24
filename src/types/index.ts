// 偶像類型定義
export interface Idol {
  id: string;
  name: string;
  nameCn?: string;
  group?: string;
  country: string;
  debutYear: number;
  platform: string[];
  image: string;
  followers: number;
  trending: boolean;
}

export interface News {
  id: string;
  title: string;
  titleCn?: string;
  summary: string;
  summaryCn?: string;
  image: string;
  source: string;
  date: string;
  category: 'release' | 'event' | 'achievement' | 'collaboration';
  relatedIdols: string[];
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  date: string;
  replies: number;
  views: number;
  category: string;
  pinned: boolean;
}

export interface TrendingTopic {
  id: string;
  name: string;
  posts: number;
  category: string;
}