import { get, post } from './services/api/utilities/provider.js';

const getLikes = async () => {
  const entrypoint = 'likes/';
  const result = await get({ API: 'involvement', entrypoint });
  return result;
};

const postLikes = async (id) => {
  const entrypoint = 'likes';
  const data = { item_id: id };
  const { status } = await post({ API: 'involvement', entrypoint, data });
  console.log(status);
  return status;
};
export { getLikes, postLikes };