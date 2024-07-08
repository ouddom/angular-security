import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUserSignUp } from '../../interface/iuser-sign-up';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup): { mismatch: boolean } | null {
    return form.get('password')!.value === form.get('confirmPassword')!.value ? null : { mismatch: true };
  }

  signup(): void {
    if (this.registerForm.invalid) {
      this.displayValidationMessages();
      return;
    }

    const { fullName, email, password } = this.registerForm.value;
    const credentials: IUserSignUp = { fullName, email, password };
    this.authService.signup(credentials);
  }

  private displayValidationMessages(): void {
    const fullNameControl = this.registerForm.get('fullName');
    const emailControl = this.registerForm.get('email');
    const passwordControl = this.registerForm.get('password');
    const confirmPasswordControl = this.registerForm.get('confirmPassword');

    if (fullNameControl!.hasError('required')) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Fullname is required!' });
    }else if (emailControl!.hasError('required')) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Email is required!' });
    }else if (emailControl!.hasError('email')) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Email format is invalid!' });
    }else if (passwordControl!.hasError('required')) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Password is required!' });
    }else if (confirmPasswordControl!.hasError('required')) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Confirm password is required!' });
    }else if (confirmPasswordControl!.hasError('mismatch')) {
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Passwords do not match!' });
    }
  }
}
