import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Category } from 'src/types/category.type';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categorySearch = '';
  categoryList: Category[] = []
  categoryDisplayList = this.categoryList;
  playerName = '';

  constructor(private readonly router: Router, private readonly authService: AuthService, private readonly route: ActivatedRoute, private readonly categoryService: CategoryService) { }
  
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      console.log('categories', categories);
      this.categoryList = categories;
      this.categoryDisplayList = categories;
    });
    this.route.params.subscribe(params => {
      this.playerName = params['playerName'];
    })
  }

  get isCategorySearchFilled() {
    return this.categorySearch.length < 1;
  }

  searchCategory() {
    this.categoryDisplayList = this.categoryList.filter((category: Category) => 
      category.name.toLocaleLowerCase()?.startsWith(this.categorySearch.toLowerCase())
    );
  }

  clearSearch() {
    this.categorySearch = '';
    this.categoryDisplayList = this.categoryList;
  }

  navigateToQuiz(category: Category): void {
    this.router.navigate(['/quiz', category.id, this.playerName]);
  }
}
