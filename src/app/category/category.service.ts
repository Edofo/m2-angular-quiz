import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from 'src/types/category.type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + '/categories');
  }

  getCategory(id: string) {
    return this.http.get<Category>(environment.apiUrl + '/categories/' + id);
  }
}