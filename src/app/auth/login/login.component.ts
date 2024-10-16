import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    const { username, password } = this.loginForm.value;
    if(!username || !password) return alert('Veuillez remplir tous les champs');
    
    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        if (user.length === 0) {
          alert('Erreur dans le pseudo ou le mot de passe');
          return;
        }
        this.authService.user = user[0];
        if (!this.authService.user) return;
        this.authService.saveUser();
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Erreur dans la requête');
      }
    });
  }
}
