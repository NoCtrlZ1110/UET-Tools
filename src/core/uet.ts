import { sendMessage, newMessage } from './../chrome/utils';
import { loadHTML } from '../chrome/utils';
import { MessageType, Sender } from '../types';
import { NewsDetailModel, NewsModel, NewsRefer } from '../models/NewsModel';

let UET_NEWS: NewsModel[];

chrome.storage.local.get('UET_NEWS', (res) => {
  if (res['UET_NEWS']) {
    UET_NEWS = res['UET_NEWS'];
    console.log(UET_NEWS);
  } else {
    console.log('no UET_NEWS on local -> fetching new data');
    fetchUETNewsList();
  }
});

// --- News List ---

const fetchUETNewsList = () => {
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
      // console.log(UET_NEWS);
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

// --- News Details ---

const filterNewsDetails = (html: string) => {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const refers: NewsRefer[] = [];

  const title = document.getElementsByClassName('single-content-title')[0]
    ?.textContent;
  const content = document
    .getElementsByClassName('single-post-content-text')[0]
    ?.textContent?.trim();

  const itemMeta = document.getElementsByClassName('item-meta')[0];

  const metadata = {
    author: itemMeta.children[0].textContent?.replace('|', '').trim(),
    date: itemMeta.children[1].textContent?.replace('|', '').trim(),
    tag: itemMeta.children[2].textContent?.replace('|', '').trim().split(' . '),
    views: itemMeta.children[5].textContent,
  };

  document
    .getElementsByClassName('single-post-content-text')[0]
    .querySelectorAll('a')
    .forEach((a) => refers.push({ title: a.textContent, url: a.href }));

  return { title, content, metadata, refers } as NewsDetailModel;
};

const fetchUETNewsDetails = (data: any) => {
  loadHTML(data.url).then((res) => {
    let details = filterNewsDetails(res);
    sendMessage(
      newMessage(Sender.Background, details, MessageType.RES_UET_NEWS_DETAILS)
    );
  });
};

const UET = {
  fetchUETNews: fetchUETNewsList,
  fetchUETNewsDetails: fetchUETNewsDetails,
};

export default UET;
