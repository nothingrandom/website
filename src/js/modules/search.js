let searchIndex = '';
const btn = document.querySelector('#toggle-search');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('.search-results');

// attach a click handler to the search link
btn.addEventListener('click', (event) => {
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
  const str = s.toLowerCase();

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
    listItem.appendChild(link);
    searchResults.appendChild(listItem);
  });
};

searchInput.addEventListener('keyup', (event) => {
  const str = searchInput.value;

  if (str.length > 2) {
    find(str);
  } else {
    clearResults();
  }
});
