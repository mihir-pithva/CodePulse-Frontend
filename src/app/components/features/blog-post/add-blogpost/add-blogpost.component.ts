import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css'],
})
export class AddBlogpostComponent implements OnInit {
  blogPost: AddBlogPost;
  categories$?: Observable<Category[]>;
  constructor(
    private _blogpostService: BlogpostService,
    private _categoryService: CategoryService,
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
}
