import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectCategoryNameService {
  private selectedCategorySubject = new BehaviorSubject<string>(''); 
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  constructor() {}

  setSelectedCategory(categoryName: string) {
    this.selectedCategorySubject.next(categoryName);
  }
}
