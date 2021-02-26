import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostGuardGuard } from './post-guard.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [PostGuardGuard] },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
  },
  { path: 'new-post', component: CreatePostComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  providers: [],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
