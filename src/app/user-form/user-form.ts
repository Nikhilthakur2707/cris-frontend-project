import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserFormComponent implements OnInit {
  dataForm: FormGroup;
  dataList: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.dataForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.http.get<any[]>('http://localhost:8080/api/data')
      .subscribe({
        next: (response) => {
          this.dataList = response;
          console.log('Data loaded:', this.dataList);
        },
        error: (error) => {
          console.error('Failed to load data:', error);
        }
      });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      const newData = {
        content: this.dataForm.value.content,
        userId: 1
        // userId: {
        //   id: 1 // TODO: Abhi ke liye hum user 1 ka data hardcode kar rahe hain. JWT ke baad isse dynamic karenge.
        // }
      };

      this.http.post('http://localhost:8080/api/data', newData)
        .subscribe({
          next: (response) => {
            console.log('Data submitted successfully!', response);
            alert('Data Submitted!');
            this.loadAllData(); // Naya data add hone ke baad list ko refresh karo
            this.dataForm.reset(); // Form ko khaali karo
          },
          error: (error) => {
            console.error('Failed to submit data:', error);
            alert('Failed to submit data!');
          }
        });
    }
  }
}