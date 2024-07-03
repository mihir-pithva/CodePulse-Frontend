import { Injectable } from '@angular/core';
import { AddCategoryModel } from '../models/add-category.model';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { UpdateCategoryModel } from '../models/update-category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  addCategory(category: AddCategoryModel): Observable<void> {
    return this._http.post<void>(
      `${environment.apiBaseUrl}/api/Categories`,
      category
    );
  }

  getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(
      `${environment.apiBaseUrl}/api/Categories`
    );
  }

  getCategory(id: string): Observable<Category> {
    return this._http.get<Category>(
      `${environment.apiBaseUrl}/api/Categories/${id}`
    );
  }

  deleteCategory(id: string): Observable<Category> {
    return this._http.delete<Category>(
      `${environment.apiBaseUrl}/api/Categories/${id}`
    );
  }

  updateCategory(
    id: string,
    category: UpdateCategoryModel
  ): Observable<Category> {
    return this._http.put<Category>(
      `${environment.apiBaseUrl}/api/Categories/${id}`,
      category
    );
  }
}