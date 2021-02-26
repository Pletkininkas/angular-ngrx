import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, take, switchMap, catchError, tap } from 'rxjs/operators';
import { loadPosts } from './store/posts.actions';
import { selectPosts } from './store/posts.selectors';

@Injectable({
  providedIn: 'root',
})
export class PostGuardGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store
      .select(selectPosts)
      .pipe(
        filter(([loading, loaded]) => !loading && !loaded),
        take(1),
        tap(() => {
          this.store.dispatch(loadPosts());
        })
      )
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
}
