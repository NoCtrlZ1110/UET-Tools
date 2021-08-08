export enum Sender {
  React,
  Content,
  Background,
}

export interface ChromeMessage {
  from: Sender;
  data: any;
  type: MessageType;
}

export enum MessageType {
  REQ_SNOW_STATUS = 'REQ_SNOW_STATUS',
  TOGGLE_SNOW = 'TOGGLE_SNOW',
  SNOW_STATUS = 'SNOW_STATUS',
  REQ_UET_NEWS = 'REQ_UET_NEWS',
  RES_UET_NEWS = 'RES_UET_NEWS',
}

export interface NewsType {
  url: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  date: string;
  month: string;
}
