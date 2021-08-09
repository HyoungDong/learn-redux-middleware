import * as postsAPI from '../api/posts';
import { createPromiseThunk, handleAsyncActions, reducerUtils } from '../lib/asyncUtils';

const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR';

const GET_POST = 'posts/GET_POST';
const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS';
const GET_POST_ERROR = 'posts/GET_POST_ERROR';

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

// thunk 함수에서도 파라미터를 받아와서 사용 할 수 있습니다.

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts')(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActions(GET_POST, 'post')(state, action);
    default:
      return state;
  }
}
