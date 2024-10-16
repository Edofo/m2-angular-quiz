import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";
import { QuizContent } from 'src/types/quiz.type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  quizContent: QuizContent[] = this.quizService.quizContent;

  constructor(private readonly quizService: QuizService, private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    if(!categoryId) {
      this.router.navigate(['/']);
      return;
    }
    this.quizService.getQuizContent(categoryId);
  }

  onAnswerSelected(answer: string, questionId: string) {
    this.quizService.addAnswer(answer, questionId);
  }
}
