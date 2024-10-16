import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Answer } from 'src/types/answer.type';
import { QuizContent } from 'src/types/quiz.type';
import { Question } from 'src/types/question.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizContent: QuizContent[] = [];
  playerAnswers: {questionId: string; answer: string}[] = [];
  score = 0;
  isQuizFinished = false;
  playerName = '';

  constructor(private readonly http: HttpClient) { }

  checkAnswers() {
    this.score = 0;
    for (const element of this.playerAnswers) {
      const question = this.quizContent.find((q) => q.id === element.questionId);
      if (!question) continue;
      for (const currentAnswer of question.answers) {
        if (currentAnswer.isCorrect && element.answer === currentAnswer.answerLabel) {
          this.score += 1;
          break;
        }
      }
    }
    this.isQuizFinished = true;
  }

  addAnswer(answer: string, questionId: string) {
    const isAnswered = this.playerAnswers.find((a) => a.questionId === questionId);
    if (isAnswered) {
      isAnswered.answer = answer;
      return;
    }
    this.playerAnswers.push({questionId, answer});
  }

  getQuizContent() {
    this.http.get<Question[]>(environment.apiUrl + '/questions').subscribe((questions) => {
      for (const question of questions) {
        this.http.get<Answer[]>(environment.apiUrl + `/answers?questionId=${question.id}`).subscribe((answers) => {
          this.quizContent.push({
            id: question.id,
            question: question.questionLabel,
            answers
          });
        });
      }
    });
  }

  resetQuiz() {
    this.quizContent = [];
    this.playerAnswers = [];
    this.score = 0;
    this.isQuizFinished = false;
  }
}
