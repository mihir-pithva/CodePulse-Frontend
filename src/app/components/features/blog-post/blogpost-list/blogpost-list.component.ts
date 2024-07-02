import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { BlogPost } from '../models/blogpost.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css'],
})
export class BlogpostListComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  constructor(private _blogpostService: BlogpostService) {}
  ngOnInit(): void {
    this._blogpostService.getAllBlogPosts().subscribe({
      next: (response) => {
        this.blogPosts = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
