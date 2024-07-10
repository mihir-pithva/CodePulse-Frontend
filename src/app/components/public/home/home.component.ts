import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogpostService } from '../../features/blog-post/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../features/blog-post/models/blogpost.model';
import { SelectCategoryNameService } from '../../shared/services/selectCategoryName.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogs: BlogPost[] = []

  name: string = ""

  constructor(private _blogPostService: BlogpostService, private _catergorySelect: SelectCategoryNameService) {}

  ngOnInit() {
    this._catergorySelect.selectedCategory$.subscribe({
      next: (name) => {
        this.name = name
        console.log(this.name);
        this.loadBlogs()
      }
    });
    this.loadBlogs();
  }

  loadBlogs() {
    this._blogPostService.getAllBlogPosts().subscribe({
      next: (response) => {
        this.blogs = response;
        if (this.name !== "") {
          this.blogs = this.blogs.filter((blog) => {
            return blog.categories.some((c) => c.name === this.name);
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
