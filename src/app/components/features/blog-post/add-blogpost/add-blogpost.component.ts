import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from 'src/app/components/shared/image-selector/services/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css'],
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  blogPost: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  imageSelectorSubscription?: Subscription;
  constructor(
    private _blogpostService: BlogpostService,
    private _categoryService: CategoryService,
    private _imageService: ImageService,
    private router: Router
  ) {
    this.blogPost = {
      title: '',
      shortDescription: '',
      content: '',
      urlHandle: '',
      author: '',
      featuredImageUrl: '',
      publishedDate: new Date(),
      isVisible: true,
      categories: [],
    };
  }
  ngOnInit(): void {
    this.categories$ = this._categoryService.getCategories();
    this._imageService.onSelectImage().subscribe({
      next: (response) => {
        this.blogPost.featuredImageUrl = response.url;
        this.closeImageSelector();
      },
      error: (error) => {},
    });
  }
  onFormSubmit() {
    this._blogpostService.createBlogPost(this.blogPost).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  openImageSelector() {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
