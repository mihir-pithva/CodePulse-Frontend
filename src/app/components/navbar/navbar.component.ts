import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../features/auth/services/auth.service';
import { User } from '../features/auth/login/models/User.model';
import { Router } from '@angular/router';
import { Category } from '../features/category/models/category.model';
import { CategoryService } from '../features/category/services/category.service';
import { SelectCategoryNameService } from '../shared/services/selectCategoryName.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  categories: Category[] = [];
  cname: string = '';
  user?: User;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _catergoryService: CategoryService,
    private _categorySelect: SelectCategoryNameService
  ) {}
  ngOnInit(): void {
    this._authService.user().subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.user = this._authService.getUser();

    this._catergoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filterBlogs(name: string) {
    this._categorySelect.setSelectedCategory(name);
    this.cname = name;
  }
  onLogout() {
    this._authService.logout();
    this._router.navigateByUrl('/');
  }
}
