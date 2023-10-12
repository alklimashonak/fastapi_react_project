const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class PredictionsApiClient {
  constructor() {
    this.base_url = BASE_API_URL;
  }

  async request(options) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== '') {
      query = '?' + query;
    }

    let response;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    }
    catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => {
          return {
            code: 500,
            message: 'The server is unresponsive',
            description: error.toString(),
          };
        }
      };
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null
    };
  }

  async get(url, query, options) {
    return this.request({ method: 'GET', url, query, ...options });
  }

  async post(url, body, options) {
    return this.request({ method: 'POST', url, body, ...options });
  }

  async put(url, body, options) {
    return this.request({ method: 'PUT', url, body, ...options });
  }

  async patch(url, body, options) {
    return this.request({ method: 'PATCH', url, body, ...options });
  }

  async delete(url, options) {
    return this.request({ method: 'DELETE', url, ...options });
  }

  async login(username, password) {
    const response = await this.post('/auth/login', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(
        `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
      ),
    });
    if (!response.ok) {
      return response.status === 400 ? 'fail' : 'error';
    }
    localStorage.setItem('accessToken', response.body.access_token);
    return 'ok';
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated() {
    return localStorage.getItem('accessToken') !== null;
  }
}