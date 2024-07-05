import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/features/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/features/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/features/category/update-category/update-category.component';
import { BlogpostListComponent } from './components/features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './components/features/blog-post/add-blogpost/add-blogpost.component';
import { UpdateBlogpostComponent } from './components/features/blog-post/update-blogpost/update-blogpost.component';
import { HomeComponent } from './components/public/home/home.component';
import { BlogDetailsComponent } from './components/public/blog-details/blog-details.component';
import { LoginComponent } from './components/features/auth/login/login.component';
import { AuthGuard } from './components/features/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent,
  },
  {
    path: 'admin/categories',
    component: CategoryListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/categories/:id',
    component: UpdateCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/blogposts',
    component: BlogpostListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/blogposts/add',
    component: AddBlogpostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/blogposts/:id',
    component: UpdateBlogpostComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
