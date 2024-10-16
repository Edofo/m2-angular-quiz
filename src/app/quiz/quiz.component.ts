import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "../shared/services/quiz.service";
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName = '';
  category = ''

  constructor(
    private readonly quizService: QuizService,
    private readonly categoryService: CategoryService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let categoryId =''
    this.route.params.subscribe(params => {
      this.quizService.playerName = params['playerName'];
      this.playerName = params['playerName'];
      categoryId = params['categoryId'];
    });
    this.categoryService.getCategory(categoryId).subscribe(category => {
      this.category = category.name;
    })
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }
}
