import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service'; // AuthService ko import karein
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // HttpClientModule ki zaroorat nahi, kyonki ab Service kaam karegi
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
    next: (response) => {
      console.log('Full login response:', response);
      const responseObject = JSON.parse(response); // Step 1: String ko object me convert karo
      const token = responseObject.token
      localStorage.setItem('token', token);
      
      console.log('Token being stored:', token);
      console.log('Token retrieved after storage:', localStorage.getItem('token'));
      
      alert('Login Successful!');
      this.router.navigate(['/freight']); 
    },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed: ' + err.error);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  
}