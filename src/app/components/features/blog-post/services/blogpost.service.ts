import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blogpost.model';
import { environment } from 'src/environments/environment.development';
import { AddBlogPost } from '../models/add-blogpost.model';
import { Observable } from 'rxjs';
import { UpdateBlogPost } from '../models/update-blogpost.model';

@Injectable({
  providedIn: 'root',
})
export class BlogpostService {
  constructor(private _http: HttpClient) {}

  createBlogPost(blogpost: AddBlogPost): Observable<BlogPost> {
    return this._http.post<BlogPost>(
      `${environment.apiBaseUrl}/api/BlogPosts`,
      blogpost
    );
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this._http.get<BlogPost[]>(
      `${environment.apiBaseUrl}/api/BlogPosts`
    );
  }

  getBlogPost(id: string): Observable<BlogPost> {
    return this._http.get<BlogPost>(
      `${environment.apiBaseUrl}/api/BlogPosts/${id}`
    );
  }

  updateBlogPost(
    id: string,
    updatedBlogPost: UpdateBlogPost
  ): Observable<BlogPost> {
    return this._http.put<BlogPost>(
      `${environment.apiBaseUrl}/api/BlogPosts/${id}`,
      updatedBlogPost
    );
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this._http.delete<BlogPost>(
      `${environment.apiBaseUrl}/api/BlogPosts/${id}`
    );
  }
}
