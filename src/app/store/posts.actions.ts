import { createAction, props } from '@ngrx/store';
import { Post } from '../shared/post';

export const loadPosts = createAction(
  '[Post] Load Posts'
);

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{posts: Post[]}>()
);

export const loadPostsFail = createAction(
  '[Post] Load Post Fail',
  props<Post>()
);

export const addPost = createAction(
  '[Post] Add Post',
  props<Post>()
);

export const addPostSuccess = createAction(
  '[Post] Add Post Success',
  props<Post>()
);

export const addPostFail = createAction(
  '[Post] Add Post Fail',
  props<Post>()
);
