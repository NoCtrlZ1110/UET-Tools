export interface NewsModel {
  url: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  date: string;
  month: string;
  tag: string;
}

export interface NewsRefer {
  title: string | null;
  url: string;
}

export interface MetaModel {
  author: string;
  date: string;
  tag: string[];
  views: string;
}

export interface NewsDetailModel {
  title: string;
  content: string;
  metadata: MetaModel;
  refers: NewsRefer[];
}
