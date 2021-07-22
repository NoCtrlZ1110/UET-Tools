import { ChromeMessage, MessageType } from './../types';
import Snow from './snow';
// import { loadHTML } from './utils';
export {};
/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('[background.js] onInstalled', details);
  // alert('[background.js] onInstalled');
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('[background.js] onConnect', port);
  // alert('[background.js] onInstalled');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[background.js] onStartup');
  // alert('[background.js] onInstalled');
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
  // alert('[background.js] onSuspend');
});

chrome.browserAction.onClicked.addListener(function (tab) {
  alert('clicked');
  chrome.tabs.sendMessage(tab.id!, { message: 'load' });
});

// --- News Core --- //

chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
  switch (message.type) {
    case MessageType.REQ_SNOW_STATUS:
      console.log('background received REQ_SNOW_STATUS', message);
      Snow.sendSnowStatus();
      break;
    case MessageType.TOGGLE_SNOW:
      console.log('background received TOGGLE_SNOW', message);
      let snowing = message.data.snowing;
      Snow.setSnowing(snowing);
      chrome.storage.local.set({ snowing: snowing });
      Snow.sendSnowStatus();
      break;
    case MessageType.UET_NEWS:
      break;
    default:
      console.log('background default', message);
      break;
  }
});

// loadHTML('https://uet.vnu.edu.vn/category/tin-tuc/tin-sinh-vien/').then(
//   (res) => {
//     console.log(res);
//     alert('loaded');
//   }
// );
