import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, postsFeatureKey, PostsState } from './posts.reducer';

export const selectPostsState = createFeatureSelector<PostsState>(postsFeatureKey);

export const selectIsPostsLoading = createSelector(selectPostsState, postsState => postsState.loading);
export const selectIsPostsLoaded = createSelector(selectPostsState, postsState => postsState.loaded);

export const { selectAll: selectPosts, } = adapter.getSelectors(selectPostsState);
export const errorMessage = createSelector(selectPostsState, state => state.error);

export const selectIsPostAdding = createSelector(selectPostsState, postsState => postsState.loading);
export const selectIsPostAdded = createSelector(selectPostsState, postsState => postsState.loaded);

export const selectPostById = (id: string) => createSelector(selectPosts, posts => posts.find(post => post.id === id));
export const selectRecentPosts = createSelector(selectPosts, posts => [...posts].reverse().slice(0, 3));
