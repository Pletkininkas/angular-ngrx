import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './shared/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  loadPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('/api/posts');
  }

  addPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>('/api/posts', post);
  }

  getPost(id): Observable<Post | undefined> {
    return this.httpClient.get<Post>(`/api/posts/${id}`);
    // .pipe(map((posts) => posts.find((post) => post.id === id)));
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
