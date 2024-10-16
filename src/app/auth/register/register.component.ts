import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  register() {
    const { username, password } = this.registerForm.value;
    if (!username || !password) return alert('Veuillez remplir tous les champs');
    
    this.authService.register(this.registerForm.value).subscribe({
      next: (data: any) => {
        if (data.error) return alert(data.error);
        this.authService.user = data.user
        if (!this.authService.user) return;
        this.authService.saveUser();
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Erreur: ' + error.error);
      }
    });
  }
}
