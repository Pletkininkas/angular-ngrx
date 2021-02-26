import {
  errorMessage,
  selectIsPostsLoaded,
  selectIsPostsLoading,
  selectPosts,
} from './../store/posts.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../shared/post';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isPostsLoading$: Observable<boolean>;
  public isPostsLoaded$: Observable<boolean>;
  public posts$: Observable<Post[]>;
  public error$: Observable<string>;

  constructor(private store: Store, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.isPostsLoading$ = this.store.select(selectIsPostsLoading);
    this.isPostsLoaded$ = this.store.select(selectIsPostsLoaded);
    this.posts$ = this.store.select(selectPosts);
    this.error$ = this.store.select(errorMessage);
    this.spinner.show();
  }
}
