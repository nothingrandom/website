const fetch = require('node-fetch');

module.exports = (async () => {
  console.log('Fetching github repos');

  // GitHub API: https://developer.github.com/v3/repos/#get
  return fetch('https://api.github.com/users/nothingrandom/repos?sort=updated')
    .then((res) => res.json()) // node-fetch option to transform to json
    .then((json) => {
      // prune the data to return only what we want
      const myRecentRepos = json.filter((r) => !r.fork).slice(0, 6);
      return {
        myRecentRepos,
      };
    });
});
