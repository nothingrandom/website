const fetch = require('node-fetch');

const username = 'nothingrandom';

module.exports = (async () => {
  // eslint-disable-next-line
  console.log('Fetching github repos');

  // GitHub API: https://developer.github.com/v3/repos/#get
  return fetch('https://api.github.com/users/nothingrandom/repos?sort=pushed', {
    headers: {
      Authorization: `Basic ${Buffer.from(username).toString('base64')}`,
    },
  })
    .then((res) => res.json()) // node-fetch option to transform to json
    .then((json) => {
      // prune the data to return only what we want
      let myRecentRepos = '';
      const excludes = ['website', 'nothingrandom']

      if (json.filter) {
        myRecentRepos = json.filter((r) => !r.fork && !excludes.includes(r.name)).slice(0, 6);
      }

      return {
        myRecentRepos,
      };
    });
});
