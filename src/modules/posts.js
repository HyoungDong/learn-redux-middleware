import * as postsAPI from '../api/posts';

const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR';

const GET_POST = 'posts/GET_POST';
const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS';
const GET_POST_ERROR = 'posts/GET_POST_ERROR';

export const getPosts = () => async dispatch => {
  dispatch({ type: GET_POSTS }); // 요청이 시작됨
  try {
    const posts = await postsAPI.getPosts(); // API 호출
    dispatch({ type: GET_POSTS_SUCCESS, posts }); // 성공
  } catch (e) {
    dispatch({ type: GET_POSTS_ERROR, error: e }); // 실패
  }
};

// thunk 함수에서도 파라미터를 받아와서 사용 할 수 있습니다.
export const getPost = id => async dispatch => {
  dispatch({ type: GET_POST }); // 요청이 시작됨
  try {
    const post = await postsAPI.getPostById(id); // API 호출
    dispatch({ type: GET_POST_SUCCESS, post }); // 성공
  } catch (e) {
    dispatch({ type: GET_POST_ERROR, error: e }); // 실패
  }
};

const initialState = {
  posts: {
    loading: false,
    data: null,
    error: null,
  },
  post: {
    loading: false,
    data: null,
    error: null,
  },
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: true,
          data: action.posts,
          error: null,
        },
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: action.error,
        },
      };
    case GET_POST:
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          loading: true,
          data: action.post,
          error: null,
        },
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
