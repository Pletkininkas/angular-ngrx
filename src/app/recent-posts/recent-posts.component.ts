import { selectRecentPosts } from './../store/posts.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../shared/post';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss'],
})
export class RecentPostsComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(selectRecentPosts);
  }
}
