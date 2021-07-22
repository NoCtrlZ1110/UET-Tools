import { ChromeMessage, MessageType, Sender } from '../types';

// --- SNOW ---
let snowing = false;

// Get locally stored value
chrome.storage.local.get('snowing', (res) => {
  if (res['snowing']) {
    snowing = true;
  } else {
    snowing = false;
  }
});

const setSnowing = (_snow: boolean) => {
  snowing = _snow;
};

const sendSnowStatus = () => {
  const message: ChromeMessage = {
    from: Sender.Background,
    data: { snowing },
    type: MessageType.SNOW_STATUS,
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

  //   console.log('background sent SNOW_STATUS', message);
};

const Snow = {
  snowing,
  sendSnowStatus,
  setSnowing,
};

export default Snow;
