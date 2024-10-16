import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";
import { QuizContent } from 'src/types/quiz.type';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  quizContent: QuizContent[] = this.quizService.quizContent;

  constructor(private readonly quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizContent();
  }

  onAnswerSelected(answer: string, questionId: string) {
    this.quizService.addAnswer(answer, questionId);
  }
}
