import { selectPostById } from './../store/posts.selectors';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../post.service';
import { Post } from '../shared/post';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  postId: string;
  post$: Observable<Post>;
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        return this.store.select(selectPostById(id));
      })
    );
  }

  addLike(post: Post): void {
    this.postService.addLike(post).subscribe();
  }

  removeLike(post: Post): void {
    this.postService.removeLike(post).subscribe();
  }
}
