import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PostService } from '../post.service';
import {
  loadPosts,
  loadPostsSuccess,
  addPost,
  addPostSuccess,
  loadPostsFail,
  addPostFail,
} from './posts.actions';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostService) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap(() =>
        this.postsService.loadPosts().pipe(
          map((posts) => loadPostsSuccess({ posts })),
          catchError(async (s) => loadPostsFail(s))
        )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action).pipe(
          map((a) => addPostSuccess(a)),
          catchError(async (s) => addPostFail(s))
        );
      })
    )
  );
}
