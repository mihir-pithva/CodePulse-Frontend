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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent,
  },
  {
    path: 'admin/categories',
    component: CategoryListComponent,
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent,
  },
  {
    path: 'admin/categories/:id',
    component: UpdateCategoryComponent,
  },
  {
    path: 'admin/blogposts',
    component: BlogpostListComponent,
  },
  {
    path: 'admin/blogposts/add',
    component: AddBlogpostComponent,
  },
  {
    path: 'admin/blogposts/:id',
    component: UpdateBlogpostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
