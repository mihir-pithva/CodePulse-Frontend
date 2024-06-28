import { Component, OnDestroy } from '@angular/core';
import { AddCategoryModel } from '../models/add-category.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  categoryDetails: AddCategoryModel;
  private addCategorySubscribtion?: Subscription;

  constructor(
    private _categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryDetails = {
      name: '',
      urlHandle: '',
    };
  }

  onFormSubmit() {
    this.addCategorySubscribtion = this._categoryService
      .addCategory(this.categoryDetails)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.log(error.message);
        },
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscribtion?.unsubscribe();
  }
}
