import { get, post } from './services/api/utilities/provider.js';

const getLikes = async () => {
  const entrypoint = 'likes/';
  const result = await get({ API: 'involvement', entrypoint });
  return result;
};

const postLikes = async (id, currentLikes) => {
  const entrypoint = 'likes';
  const data = { item_id: id };
  const { status } = await post({ API: 'involvement', entrypoint, data });
  document.getElementById(`Likebutton-${id}`).innerText = `Likes: ${currentLikes + 1}`;
  return status;
};
export { getLikes, postLikes };