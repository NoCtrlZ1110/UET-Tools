import { sendMessage, newMessage } from './../chrome/utils';
import { loadHTML } from '../chrome/utils';
import { MessageType, NewsModel, Sender } from '../types';

let UET_NEWS: NewsModel[];

chrome.storage.local.get('UET_NEWS', (res) => {
  if (res['UET_NEWS']) {
    UET_NEWS = res['UET_NEWS'];
    console.log(UET_NEWS);
  } else {
    console.log('no UET_NEWS on local -> fetching new data');
    fetchUETNews();
  }
});

const fetchUETNews = () => {
  if (UET_NEWS && UET_NEWS.length > 0) {
    sendMessage(
      newMessage(Sender.Background, UET_NEWS, MessageType.RES_UET_NEWS)
    );
  }
  loadHTML('https://uet.vnu.edu.vn/category/tin-tuc/tin-sinh-vien/').then(
    (res) => {
      UET_NEWS = filterNews(res);
      sendMessage(
        newMessage(Sender.Background, UET_NEWS, MessageType.RES_UET_NEWS)
      );
      console.log(UET_NEWS);
      chrome.storage.local.set({ UET_NEWS });
    }
  );
};

export const filterNews = (html: string) => {
  const news: NewsModel[] = [];
  const document = new DOMParser().parseFromString(html, 'text/html');
  Array.from(document.getElementsByClassName('blog-post-item')).forEach(
    (item: any) => {
      news.push({
        thumbnail: item.querySelector(
          ' div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > img'
        ).src,
        title: item.querySelector(
          ' div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h3:nth-child(1) > a'
        ).textContent,
        url: item.querySelector(
          ' div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h3:nth-child(1) > a'
        ).href,
        excerpt: item.querySelector(
          'div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)'
        ).textContent,
        month: item.querySelector(
          'div:nth-child(1) div:nth-child(1) div:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1)'
        ).textContent,
        date: item.querySelector(
          'div:nth-child(1) div:nth-child(1) div:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(2)'
        ).textContent,
        tag: item.querySelector(
          'div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(2) > a:nth-child(1)'
        ).textContent,
      });
    }
  );
  return news;
};

const UET = {
  fetchUETNews,
};

export default UET;
