import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../features/blog-post/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../features/blog-post/models/blogpost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPost[]>;

  constructor(private _blogPostService: BlogpostService) {}

  ngOnInit() {
    this.blogs$ = this._blogPostService.getAllBlogPosts();
  }
}
