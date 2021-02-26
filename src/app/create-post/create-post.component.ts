import {
  errorMessage,
  selectIsPostAdding,
  selectIsPostAdded,
} from './../store/posts.selectors';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { concat, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostService } from '../post.service';
import { addPost } from '../store/posts.actions';
import { AuthorValidator } from './author.validator';
import { blockedAuthorValidator } from './blocked-author.validator';
import { explicitValidator } from './explicit.validator';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  public postForm: FormGroup;
  public maxContent = 50;
  public charsRemaining$: Observable<number>;
  public isPostAdding$: Observable<boolean>;
  public isPostAdded$: Observable<boolean>;
  public error$: Observable<string>;
  public addingPost = false;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private store: Store,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.isPostAdding$ = this.store.select(selectIsPostAdding);
    this.isPostAdded$ = this.store.select(selectIsPostAdded);
    this.error$ = this.store.select(errorMessage);
    this.spinner.show();
    this.postForm = this.fb.group(
      {
        author: [
          '',
          {
            validators: [
              Validators.required,
              Validators.pattern('^[A-Za-z ]*$'),
            ],
            updateOn: 'blur',
            asyncValidators: [blockedAuthorValidator(this.postService)],
          },
        ],
        title: ['', [Validators.required]],
        content: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(this.maxContent),
            explicitValidator,
          ],
        ],
      },
      { validators: AuthorValidator }
    );
    this.charsRemaining$ = concat(of(''), this.content.valueChanges).pipe(
      map((content) => {
        return this.maxContent - (content?.length || 0);
      })
    );
  }

  get author() {
    return this.postForm.get('author');
  }
  get title() {
    return this.postForm.get('title');
  }
  get content() {
    return this.postForm.get('content');
  }

  reset() {
    this.addingPost = false;
    this.postForm.reset();
  }

  submitForm() {
    this.addingPost = true;
    this.store.dispatch(addPost(this.postForm.value));
  }
}
