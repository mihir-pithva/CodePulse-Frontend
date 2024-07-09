import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoryListComponent } from './components/features/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/features/category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UpdateCategoryComponent } from './components/features/category/update-category/update-category.component';
import { BlogpostListComponent } from './components/features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './components/features/blog-post/add-blogpost/add-blogpost.component';
import { MarkdownModule } from 'ngx-markdown';
import { UpdateBlogpostComponent } from './components/features/blog-post/update-blogpost/update-blogpost.component';
import { ImageSelectorComponent } from './components/shared/image-selector/image-selector.component';
import { HomeComponent } from './components/public/home/home.component';
import { BlogDetailsComponent } from './components/public/blog-details/blog-details.component';
import { LoginComponent } from './components/features/auth/login/login.component';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { AuthGuard } from './components/features/auth/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    UpdateBlogpostComponent,
    ImageSelectorComponent,
    HomeComponent,
    BlogDetailsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
