const API_URL = 'https://rest.sataya.ru/v1/public';
// const API_URL = 'http://localhost:3000/v1/public';
const CAMPAIGN_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

export default class Api {
  static getURL() {
    return API_URL;
  }

  static getCampaignId() {
    return CAMPAIGN_ID;
  }

  static get(path, params = {}, headers = {}) {
    const url = `${path}?campaignId=${CAMPAIGN_ID}&${new URLSearchParams(params).toString()}`;

    return fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }).then(async (response) => {
      const data = await response.json();
      const status = response.status;

      return {
        status,
        data
      };
    });
  }

  static post(path, params = {}, headers = {}) {
    const body = JSON.stringify(params);

    return fetch(`${API_URL}${path}?campaignId=${CAMPAIGN_ID}`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }).then(async (response) => {
      const data = await response.json();
      const status = response.status;

      return {
        status,
        data
      };
    });
  }
}
