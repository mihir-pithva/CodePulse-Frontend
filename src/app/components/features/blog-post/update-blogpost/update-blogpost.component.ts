import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPost } from '../models/update-blogpost.model';
import { ImageService } from 'src/app/components/shared/image-selector/services/image.service';

@Component({
  selector: 'app-update-blogpost',
  templateUrl: './update-blogpost.component.html',
  styleUrls: ['./update-blogpost.component.css'],
})
export class UpdateBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = '';
  paramsSubscription?: Subscription;
  updateSubscription?: Subscription;
  getSubscription?: Subscription;
  deleteSubscription?: Subscription;
  imageSelectSubscription?: Subscription;
  blogPost?: BlogPost;
  categories$?: Observable<Category[]>;
  selectCategories?: string[];
  isImageSelectorVisible: boolean = false;

  constructor(
    private _blogpostService: BlogpostService,
    private _categoryService: CategoryService,
    private _imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories$ = this._categoryService.getCategories();
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.getSubscription = this._blogpostService
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

        this._imageService.onSelectImage().subscribe({
          next: (response) => {
            if (this.blogPost) {
              this.blogPost.featuredImageUrl = response.url;
              this.closeImageSelector();
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
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

      this.updateSubscription = this._blogpostService
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
      this.deleteSubscription = this._blogpostService
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

  openImageSelector() {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.getSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
