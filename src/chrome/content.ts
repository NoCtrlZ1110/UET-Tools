import { ChromeMessage, Sender } from '../types';

type MessageResponse = (response?: any) => void;

// --- SNOW ---

let snowing = false;
chrome.runtime.sendMessage({ type: 'REQ_SNOW_STATUS' });
const body = document.getElementsByTagName('body');

const snowflakesContainer = document.createElement('div');
snowflakesContainer.className = 'snowflakes';
snowflakesContainer.setAttribute('aria-hidden', 'true');

const snowflake = document.createElement('div');
snowflake.className = 'snowflake';
snowflake.innerHTML = '❆';

for (let i = 0; i < 12; i++) {
  snowflakesContainer.appendChild(snowflake.cloneNode(true));
}

//---

const validateSender = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender
) => {
  return (
    (sender.id === chrome.runtime.id && message.from === Sender.React) ||
    Sender.Background
  );
};

const snow = (_snow: boolean) => {
  if (_snow) {
    if (!snowing) {
      body[0]?.prepend(snowflakesContainer);
    }
  } else {
    snowflakesContainer.parentNode?.removeChild(snowflakesContainer);
  }
  snowing = _snow;
};

const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse
) => {
  const isValidated = validateSender(message, sender);
  console.log('isValidated', isValidated);
  console.log('data', message);

  if (isValidated) {
    switch (message.type) {
      case 'SNOW_STATUS':
        console.log('content received SNOW_STATUS', message);
        snow(message.data.snowing);
        break;

      default:
        console.log('default', message);
        break;
    }
  } else {
    return;
  }
};

const main = () => {
  console.log('[content.ts] Main');
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
};

main();
