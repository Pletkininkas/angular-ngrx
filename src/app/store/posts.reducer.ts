import { Post } from './../shared/post';
import { createReducer, on } from '@ngrx/store';
import {
  loadPosts,
  loadPostsSuccess,
  addPost,
  addPostSuccess,
  loadPostsFail,
  addPostFail,
} from './posts.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export const postsFeatureKey = 'posts';

export interface PostsState extends EntityState<Post> {
  error: string | null;
  loading: boolean;
  loaded: boolean;
}

export const adapter = createEntityAdapter<Post>();

export const initialState: PostsState = adapter.getInitialState({
  error: null,
  loading: false,
  loaded: false,
});

export const postsReducer = createReducer(
  initialState,
  on(loadPosts, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return adapter.addMany(action.posts, {
      ...state,
      data: action.posts,
      loading: false,
      loaded: true,
      error: null,
    });
  }),
  on(addPost, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
    };
  }),
  on(addPostSuccess, (state, action) => {
    return adapter.addOne(action, {
      ...state,
      data: action,
      loading: false,
      loaded: true,
      error: null,
    });
  }),
  on(loadPostsFail, (state) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: 'Could not connect to the database. Try again later!',
    };
  }),
  on(addPostFail, (state) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: 'Could not add post. Try again later!',
    };
  })
);
