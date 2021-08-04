/* eslint-disable import/prefer-default-export */

const CORS_URL = 'https://cors-anywhere.herokuapp.com';
const BASE_URL = 'https://age-of-empires-2-api.herokuapp.com/api/v1';

export const get = async ({ entrypoint }) => {
  const url = `${CORS_URL}/${BASE_URL}/${entrypoint}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};