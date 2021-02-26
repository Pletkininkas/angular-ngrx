import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, mapTo } from 'rxjs/operators';
import { Post } from './shared/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  loadPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('/api/posts').pipe(delay(1000));
  }

  validateName(name): Observable<boolean> {
    return this.httpClient
      .get<unknown>(`https://empty-poetry-bf01.akademija.workers.dev/${name}`)
      .pipe(
        mapTo(true),
        catchError(() => of(false))
      );
  }

  addPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>('/api/posts', post).pipe(delay(1000));
  }

  getPost(id): Observable<Post | undefined> {
    return this.httpClient.get<Post>(`/api/posts/${id}`);
  }

  addLike(post: Post): Observable<Post> {
    return this.httpClient.put<Post>(`/api/posts/${post.id}`, {
      ...post,
      likes: post.likes + 1,
    });
  }
  removeLike(post: Post): Observable<Post> {
    return this.httpClient.put<Post>(`/api/posts/${post.id}`, {
      ...post,
      likes: post.likes - 1,
    });
  }
}
