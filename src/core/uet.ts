import { loadHTML } from '../chrome/utils';
import { MessageType, Sender } from '../types';

let UET_HTML;

chrome.storage.local.get('UET_HTML', (res) => {
  if (res['UET_HTML']) {
    UET_HTML = res['UET_HTML'];
    console.log(UET_HTML);
  } else {
    console.log('no UET_HTML on local');
  }
});

const fetchUETNews = () => {
  loadHTML('https://uet.vnu.edu.vn/category/tin-tuc/tin-sinh-vien/').then(
    (res) => {
      UET_HTML = res;
      chrome.runtime.sendMessage({
        from: Sender.Background,
        data: UET_HTML,
        type: MessageType.RES_UET_NEWS,
      });
      console.log('UET_HTML', UET_HTML);

      chrome.storage.local.set({ UET_HTML });
    }
  );
};

const UET = {
  UET_HTML,
  fetchUETNews,
};

export default UET;
