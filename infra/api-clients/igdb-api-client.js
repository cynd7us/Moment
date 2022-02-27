const axios = require('axios');

class IGDBApiClient {
  constructor(options) {
    this.client_id = options.client_id;
    this.client_secret = options.client_secret;
    this.authorizationHeaders = { 'Client-ID': this.client_id };
    this.baseUrl = 'https://api.igdb.com/v4';
  }

  async authenticate() {
    const oauthUrl = `https://id.twitch.tv/oauth2/token?client_id=${this.client_id}&client_secret=${this.client_secret}&grant_type=client_credentials`;
    const response = await axios.post(oauthUrl);
    const {
      data: { access_token: accessToken },
    } = response;
    this.authorizationHeaders.Authorization = `Bearer ${accessToken}`;
  }

  async getMostRated() {
    const url = `${this.baseUrl}/games`;
    let response;
    const data =
      'fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;';
    try {
      response = await axios.post(url, { data }, { headers: this.authorizationHeaders });
    } catch (error) {
      console.error(error);
    }
    console.log(response);
  }

  async getPopular() {
    // TODO: implement
  }

  async getNew() {
    // TODO: implement
  }
}

module.exports = IGDBApiClient;
