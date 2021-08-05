/* eslint-disable import/prefer-default-export */

const CORS_URL = 'https://cors-anywhere.herokuapp.com';
const BASE_URL = {
  appID: 'OiEshHziuRYhMOT7MZZJ',
  AOE: 'https://age-of-empires-2-api.herokuapp.com/api/v1',
  get involvement() {
    return `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${this.appID}`;
  },
};

const postOptions = (data) => ({
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(data),
});

export const get = async ({ API, entrypoint }) => {
  const url = `${CORS_URL}/${BASE_URL[API]}/${entrypoint}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const post = async ({ API, entrypoint, data }) => {
  const options = postOptions(data);
  const url = `${CORS_URL}/${BASE_URL[API]}/${entrypoint}`;
  try {
    const response = await fetch(url, options);
    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    return error;
  }
};