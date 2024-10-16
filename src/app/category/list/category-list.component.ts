import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/types/category.type';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  @Input() categoryDisplayList: Category[] = [];  
  @Output() categorySelected = new EventEmitter<Category>(); 

  navigateToQuiz(category: Category): void {
    this.categorySelected.emit(category);  
  }
}
