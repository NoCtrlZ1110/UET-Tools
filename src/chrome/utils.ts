import { ChromeMessage, MessageType, Sender } from '../types';

export const getCurrentTabUrl = (
  callback: (url: string | undefined) => void
): void => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].url);
    });
};

export const getCurrentTabUId = (
  callback: (url: number | undefined) => void
): void => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].id);
    });
};

export const loadHTML = async (url: string) => {
  const response = await fetch(url);
  const text = await response.text();
  return text;
  // return new DOMParser().parseFromString(text, 'text/html');
};

export const newMessage: (
  from: Sender,
  data: any,
  type: MessageType
) => ChromeMessage = (from, data, type) => {
  return { from, data, type } as ChromeMessage;
};

export const sendMessage = (message: ChromeMessage) => {
  chrome.runtime?.sendMessage(message);
};

export const addMessageListener = (
  type: MessageType,
  callback: (m: ChromeMessage) => void
) => {
  chrome.runtime?.onMessage.addListener((m: ChromeMessage) => {
    if (m.type === type) {
      callback(m);
    }
  });
};
