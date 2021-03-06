import UET from '../core/uet';
import { ChromeMessage, MessageType } from './../types';
import Snow from './snow';
// import { loadHTML } from './utils';
export {};
/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('[background.js] onInstalled', details);
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('[background.js] onConnect', port);
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[background.js] onStartup');
});

/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
  console.log('[background.js] onSuspend');
});

chrome.browserAction.onClicked.addListener(function (tab) {
  alert('clicked');
  chrome.tabs.sendMessage(tab.id!, { message: 'load' });
});

// --- News Core --- //

chrome.runtime.onMessage.addListener(
  (message: ChromeMessage, sender, sendResponse: (res?: any) => void) => {
    switch (message.type) {
      case MessageType.REQ_SNOW_STATUS:
        Snow.sendSnowStatus();
        break;
      case MessageType.TOGGLE_SNOW:
        Snow.toggleSnow(message);
        break;
      case MessageType.REQ_UET_NEWS:
        UET.fetchUETNews();
        break;
      case MessageType.REQ_UET_NEWS_DETAILS:
        UET.fetchUETNewsDetails(message.data);
        break;
      default:
        console.log('background default', message);
        break;
    }
  }
);
