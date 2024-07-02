import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPost } from '../models/update-blogpost.model';

@Component({
  selector: 'app-update-blogpost',
  templateUrl: './update-blogpost.component.html',
  styleUrls: ['./update-blogpost.component.css'],
})
export class UpdateBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = '';
  paramsSubscribtion?: Subscription;
  updateSubscribtion?: Subscription;
  getSubscribtion?: Subscription;
  deleteSubscribtion?: Subscription;
  blogPost?: BlogPost;
  categories$?: Observable<Category[]>;
  selectCategories?: string[];

  constructor(
    private _blogpostService: BlogpostService,
    private _categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories$ = this._categoryService.getCategories();
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.getSubscribtion = this._blogpostService
            .getBlogPost(this.id)
            .subscribe({
              next: (response) => {
                this.blogPost = response;
                this.selectCategories = response.categories.map(
                  (category) => category.id
                );
              },
            });
        }
      },
    });
  }

  onFormSubmit() {
    if (this.blogPost && this.id) {
      let updateBlogPost: UpdateBlogPost = {
        title: this.blogPost.title,
        urlHandle: this.blogPost.urlHandle,
        shortDescription: this.blogPost.shortDescription,
        content: this.blogPost.content,
        featuredImageUrl: this.blogPost.featuredImageUrl,
        isVisible: this.blogPost.isVisible,
        publishedDate: this.blogPost.publishedDate,
        author: this.blogPost.author,
        categories: this.selectCategories ?? [],
      };

      this.updateSubscribtion = this._blogpostService
        .updateBlogPost(this.id, updateBlogPost)
        .subscribe({
          next: (resposnse) => {
            this.router.navigateByUrl('/admin/blogposts');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  onDeleteBlogPost() {
    if (this.id) {
      this.deleteSubscribtion = this._blogpostService
        .deleteBlogPost(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscribtion?.unsubscribe();
    this.updateSubscribtion?.unsubscribe();
    this.getSubscribtion?.unsubscribe();
    this.deleteSubscribtion?.unsubscribe();
  }
}
