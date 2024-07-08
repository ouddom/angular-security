import { Component } from '@angular/core';
import { IUser } from '../../interface/iuser';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.displayValidationMessages();
      return;
    }

    this.authService.login(this.loginForm.value);
  }

  private displayValidationMessages(): void {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (emailControl!.hasError('required')) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Email is required!' });
    } else if (emailControl!.hasError('email')) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Email format is invalid!' });
    }

    if (passwordControl!.hasError('required')) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Password is required!' });
    }
  }
}
