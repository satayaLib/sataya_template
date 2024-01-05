class Api {
  static getURL() {
    return API_URL;
  }

  static getCampaignId() {
    return CAMPAIGN_ID;
  }

  static get(path, params = {}, headers = {}) {
    const url = `${path}?campaignId=${Api.getCampaignId()}&${new URLSearchParams(
      params
    ).toString()}`;

    return fetch(`${Api.getURL()}${url}`, {
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

    return fetch(`${Api.getURL()}${path}?campaignId=${Api.getCampaignId()}`, {
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

export default Api;
