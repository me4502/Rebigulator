import fetch from 'node-fetch';

const API_ENDPOINT = 'https://frinkiac.com/api/random';

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
