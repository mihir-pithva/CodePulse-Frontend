import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryModel } from '../models/update-category.model';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {
  id: string | null = '';
  paramsSubscribtion?: Subscription;
  updateSubscribtion?: Subscription;
  category?: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.categoryService.getCategory(this.id).subscribe({
            next: (response) => {
              this.category = response;
            },
          });
        }
      },
    });
  }

  onFormSubmit(): void {
    const updateCategory: UpdateCategoryModel = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };
    if (this.id) {
      this.updateSubscribtion = this.categoryService
        .updateCategory(this.id, updateCategory)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/categories');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  onDeleteCategory() {
    if (this.id) {
      this.categoryService.deleteCategory(this.id).subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscribtion?.unsubscribe();
    this.updateSubscribtion?.unsubscribe();
  }
}
