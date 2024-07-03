import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../features/blog-post/services/blogpost.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../../features/blog-post/models/blogpost.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  blogPost$?: Observable<BlogPost>;
  url: string | null = '';
  getBlogPostByUrlSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private _blogPostService: BlogpostService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('url');
        if (this.url) {
          this.blogPost$ = this._blogPostService.getBlogPostByUrl(this.url);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy() {
    this.getBlogPostByUrlSubscription?.unsubscribe();
  }
}
