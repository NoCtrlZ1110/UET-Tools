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
  UET_NEWS = 'UET_NEWS',
  SNOW_STATUS = 'SNOW_STATUS',
}
