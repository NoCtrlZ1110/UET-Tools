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
  return new DOMParser().parseFromString(text, 'text/html');
};
