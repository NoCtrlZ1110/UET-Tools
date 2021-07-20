import { ChromeMessage, Sender } from './../types';
export {};
/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('[background.js] onInstalled', details);
  alert('[background.js] onInstalled');
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('[background.js] onConnect', port);
  alert('[background.js] onInstalled');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[background.js] onStartup');
  alert('[background.js] onInstalled');
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
  alert('[background.js] onSuspend');
});

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log('clicked');
  chrome.tabs.sendMessage(tab.id!, { message: 'load' });
});

// --- SNOW ---

const sendSnowStatus = (snowing: boolean) => {
  const message: ChromeMessage = {
    from: Sender.Background,
    data: { snowing },
    type: 'SNOW_STATUS',
  };

  // send message to popup
  chrome.runtime.sendMessage(message);

  // send message to every active tab
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });

  console.log('background sent SNOW_STATUS', message);
};

let snowing = false;

// Get locally stored value
chrome.storage.local.get('snowing', (res) => {
  if (res['snowing']) {
    snowing = true;
  } else {
    snowing = false;
  }
});

chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
  switch (message.type) {
    case 'REQ_SNOW_STATUS':
      console.log('background received REQ_SNOW_STATUS', message);
      sendSnowStatus(snowing);
      break;
    case 'TOGGLE_SNOW':
      console.log('background received TOGGLE_SNOW', message);
      snowing = message.data.snowing;
      chrome.storage.local.set({ snowing: snowing });
      sendSnowStatus(snowing);
      break;
    default:
      console.log('background default', message);
      break;
  }
});
