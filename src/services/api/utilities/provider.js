/* eslint-disable import/prefer-default-export */

const BASE_URL = 'https://age-of-empires-2-api.herokuapp.com/api/v1';

export const get = async ({ entrypoint }) => {
  const url = `${BASE_URL}/${entrypoint}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};