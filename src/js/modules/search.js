const meaningless = require('../../_data/search-regex');

let searchIndex = '';
const btn = document.querySelector('#toggle-search');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('.search-results');

// attach a click handler to the search link
btn.addEventListener('click', () => {
  // don't navigate to that page. Stay put.
  // event.preventDefault();

  searchInput.focus();
  searchInput.select();

  // get the data
  fetch('/search.json').then((response) => response.json()).then((response) => {
    searchIndex = response.search;
  });
}, false);

const clearResults = () => {
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }
};

const find = (s) => {
  let str = s.toLowerCase();

  str = str.replace(meaningless, '');

  // look for matches in each item in the JSON
  const results = [];

  searchIndex.forEach((item) => {
    const found = item.text.indexOf(str);
    if (found !== -1) {
      results.push(item);
    }
  });

  // build and insert the new result entries
  clearResults();
  results.forEach((item) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = item.title;
    link.setAttribute('href', item.url);
    listItem.classList.add('search-results__result');
    listItem.appendChild(link);
    searchResults.appendChild(listItem);
  });
};

searchInput.addEventListener('keyup', () => {
  const str = searchInput.value;

  if (str.length > 2) {
    find(str);
  } else {
    clearResults();
  }
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    return false;
  }

  return false;
});
