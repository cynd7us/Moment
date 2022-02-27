const { IGDBApiClient } = require('../../../infra/api-clients');

const getMostRatedGames = async () => {
  const api = new IGDBApiClient({
    client_id: 'nymphhx5jr5rl0n9ve7lew1363tl7q',
    client_secret: 'wt1dxegjqo79uh295156qe2e8s8ky5',
  });

  await api.authenticate();
  const data = await api.getMostRated();
};

module.exports = {
  getMostRatedGames,
};
