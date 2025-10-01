// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.html',
//   imports: [
//     CommonModule,
//     ReactiveFormsModule, 
//   ],
//   styleUrls: ['./register.css']
// })
// export class RegisterComponent {
//   registerForm: FormGroup;
//   router: any;

//   constructor(private fb: FormBuilder, private authService: AuthService) {
//     this.registerForm = this.fb.group({
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required]
//     }, { validators: this.passwordMatchValidator });
//   }

//   passwordMatchValidator(form: FormGroup) {
//     return form.get('password')?.value === form.get('confirmPassword')?.value 
//       ? null : { mismatch: true };
//   }

//   onSubmit() {
//     if (this.registerForm.invalid) {
//       return;
//     }

//     const userData = {
//       username: this.registerForm.value.username,
//       email: this.registerForm.value.email,
//       password: this.registerForm.value.password
//     };

//     this.authService.register(userData).subscribe({
//       next: (res) => {
//         alert('Registration successful!');
//         console.log(res);
//         this.router.navigate(['/login']);
//       },
//       error: (err) => {
//         alert('Registration failed!');
//         console.error(err);
//       }
//     });
//   }
//   goToLogin() {
//     this.router.navigate(['/login']);
//   }
// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Add this import
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true, // Add this
  imports: [
    CommonModule,
    ReactiveFormsModule, 
  ],
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router // Add this to constructor
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const userData = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.authService.register(userData).subscribe({
      next: (res) => {
        alert('Registration successful!');
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Registration failed!');
        console.error(err);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}