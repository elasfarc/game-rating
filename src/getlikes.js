import { get } from './services/api/utilities/provider.js';

const getLikes = async () => {
  const entrypoint = 'likes/';
  const result = await get({ API: 'involvement', entrypoint });
  return result;
};

export default getLikes;