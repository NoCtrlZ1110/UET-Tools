export enum Sender {
  React,
  Content,
  Background,
}

export interface ChromeMessage {
  from: Sender;
  data: any;
  type: string;
}
