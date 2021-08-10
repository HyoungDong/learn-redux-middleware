import { getContext, takeEvery, select } from '@redux-saga/core/effects';
import * as postsAPI from '../api/posts';
import {
  createPromiseSaga,
  createPromiseSagaById,
  //   createPromiseThunk,
  //   createPromiseThunkById,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from '../lib/asyncUtils';

const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR';

const GET_POST = 'posts/GET_POST';
const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS';
const GET_POST_ERROR = 'posts/GET_POST_ERROR';
const GO_TO_HOME = 'posts/GO_TO_HOME';
const PRINT_STATE = 'posts/PRINT_STATE';

//const CLEAR_POST = 'posts/CLEAR_POST';

// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);
export const getPosts = () => ({ type: GET_POSTS });
export const getPost = id => ({ type: GET_POST, payload: id, meta: id });
export const goToHome = () => ({ type: GO_TO_HOME });
export const printState = () => ({ type: PRINT_STATE });

// export const goToHome =
//   () =>
//   (dispatch, getState, { history }) => {
//     history.push('/');
//   };
// const clearPost = () => ({ type: CLEAR_POST });

// thunk 함수에서도 파라미터를 받아와서 사용 할 수 있습니다.

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);
function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}
function* printStateSaga() {
  const state = yield select(state => state.posts);
  console.log(state);
}

export function* postSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
  yield takeEvery(PRINT_STATE, printStateSaga);
}
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};
const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncActionsById(GET_POST, 'post', true);

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    default:
      return state;
  }
}
