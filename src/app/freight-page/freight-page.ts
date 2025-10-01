// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-freight-page',
//   templateUrl: './freight-page.html',
//   styleUrls: ['./freight-page.css']
// })
// export class FreightPage implements OnInit {

//   tableData = {
//     ntkms: {
//       targetThisYear: 12000,
//       targetLastYear: 11500,
//       unitsThisYear: 11800,
//       unitsLastYear: 11000,
//       forMonthThisYear: 1000,
//       forMonthLastYear: 950,
//       upToThisMonthThisYear: 9800,
//       upToThisMonthLastYear: 9200,
//       var: 6.5
//     },
//     lead: {
//     },
//   };

//   constructor() { }

//   ngOnInit(): void {
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FreightDataService } from '../services/freight-data.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-freight-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './freight-page.html',
  styleUrls: ['./freight-page.css']
})
export class FreightPage implements OnInit {

  freightForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  submittedData: any = null;
  
  // Define the structure for each metric
  tableData = {
    ntkms: {
      target: '',
      units: '',
      forMonthThisYear: '',
      forMonthLastYear: '',
      upToMonthThisYear: '',
      upToMonthLastYear: '',
      percentVar: ''
    },
    lead: {
      target: '',
      units: '',
      forMonthThisYear: '',
      forMonthLastYear: '',
      upToMonthThisYear: '',
      upToMonthLastYear: '',
      percentVar: ''
    },
    loadingRakes: {
      target: '',
      units: '',
      forMonthThisYear: '',
      forMonthLastYear: '',
      upToMonthThisYear: '',
      upToMonthLastYear: '',
      percentVar: ''
    },
    loadingWagons: {
      target: '',
      units: '',
      forMonthThisYear: '',
      forMonthLastYear: '',
      upToMonthThisYear: '',
      upToMonthLastYear: '',
      percentVar: ''
    },
    loadingTonnes: {
      target: '',
      units: '',
      forMonthThisYear: '',
      forMonthLastYear: '',
      upToMonthThisYear: '',
      upToMonthLastYear: '',
      percentVar: ''
    },
    locoHoldingDiesel: {
      target: '',
      units: '',
      forMonthThisYear: '',
      forMonthLastYear: '',
      upToMonthThisYear: '',
      upToMonthLastYear: '',
      percentVar: ''
    },
    locoHoldingElectric: {
      target: '',
      units: '',
      forMonthThisYear: '',
      forMonthLastYear: '',
      upToMonthThisYear: '',
      upToMonthLastYear: '',
      percentVar: ''
    },
    locoUtilisationDiesel: {
      target: '',
      units: '',
      forMonthThisYear: '',
      forMonthLastYear: '',
      upToMonthThisYear: '',
      upToMonthLastYear: '',
      percentVar: ''
    },
    locoUtilisationElectric: {
      target: '',
      units: '',
      forMonthThisYear: '',
      forMonthLastYear: '',
      upToMonthThisYear: '',
      upToMonthLastYear: '',
      percentVar: ''
    },
    rakeHoldingBoxn: {
      target: '',
      units: '',
      forMonthThisYear: '',
      forMonthLastYear: '',
      upToMonthThisYear: '',
      upToMonthLastYear: '',
      percentVar: ''
    }
  };

  constructor(
    private fb: FormBuilder,
    private freightDataService: FreightDataService,
    private router: Router
  ) {
    this.freightForm = this.createForm();
  }

  ngOnInit(): void {
    // Auto-calculate percentage variance when values change
    this.setupPercentageCalculations();
  }

  createForm(): FormGroup {
    const formGroup: any = {};
    
    Object.keys(this.tableData).forEach(key => {
      formGroup[key] = this.fb.group({
        target: [''],
        units: [''],
        forMonthThisYear: ['', Validators.required],
        forMonthLastYear: [''],  // This could be auto-populated from last year's data
        upToMonthThisYear: ['', Validators.required],
        upToMonthLastYear: [''], // This could be auto-populated from last year's data
        percentVar: [{value: '', disabled: true}] // Auto-calculated field
      });
    });

    return this.fb.group(formGroup);
  }

  setupPercentageCalculations(): void {
    Object.keys(this.tableData).forEach(key => {
      const formGroup = this.freightForm.get(key);
      if (formGroup) {
        // Watch for changes in current year and last year values to auto-calculate percentage
        formGroup.get('upToMonthThisYear')?.valueChanges.subscribe(() => {
          this.calculatePercentageVariation(key);
        });
        formGroup.get('upToMonthLastYear')?.valueChanges.subscribe(() => {
          this.calculatePercentageVariation(key);
        });
      }
    });
  }

  calculatePercentageVariation(fieldKey: string): void {
    const formGroup = this.freightForm.get(fieldKey);
    if (formGroup) {
      const thisYear = parseFloat(formGroup.get('upToMonthThisYear')?.value) || 0;
      const lastYear = parseFloat(formGroup.get('upToMonthLastYear')?.value) || 0;
      
      let percentVar = 0;
      if (lastYear !== 0) {
        percentVar = ((thisYear - lastYear) / lastYear) * 100;
      }
      
      formGroup.get('percentVar')?.setValue(percentVar.toFixed(2));
    }
  }

  onSubmit(): void {
    if (this.freightForm.valid) {
      this.isSubmitting = true;
      this.submitError = '';
      
      const formData = this.freightForm.value;
      console.log('Form Data:', formData);
      
      this.freightDataService.saveFreightData(formData).subscribe(
        response => {
          console.log('Data saved successfully:', response);
          this.submitSuccess = true;
          this.submittedData = formData;
          this.isSubmitting = false;
        },
        error => {
          console.error('Error saving data:', error);
          this.submitError = 'Failed to save data. Please try again.';
          this.isSubmitting = false;
        }
      );
    } else {
      console.log('Form is invalid');
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.tableData).forEach(key => {
      const control = this.freightForm.get(key);
      if (control && control instanceof FormGroup) {
        Object.keys(control.controls).forEach(controlKey => {
          control.get(controlKey)?.markAsTouched();
        });
      }
    });
  }

  // Helper method to get form control for template
  getFormControl(fieldKey: string, controlName: string) {
    return this.freightForm.get(`${fieldKey}.${controlName}`);
  }

  onReset(): void {
    this.freightForm.reset();
    this.submitSuccess = false;
    this.submitError = '';
    this.submittedData = null;
  }

  onViewData(): void {
    // You can navigate to a separate view page or show data in a modal
    console.log('Viewing submitted data:', this.submittedData);
    // For now, we'll just show an alert, but you can implement a proper view
    alert('View functionality - check console for submitted data');
  }

  onEditData(): void {
    // Reset the success state and allow editing
    this.submitSuccess = false;
    // Form already has the data, so user can edit
  }

  onLogout(): void {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  // Method to go back to form from success state
  onBackToForm(): void {
    this.submitSuccess = false;
  }
}
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-freight-page',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
//   templateUrl: './freight-page.html',
//   styleUrls: ['./freight-page.css']
// })
// export class FreightPage implements OnInit {

//   freightForm!: FormGroup;
//   submittedData: any[] = []; 

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.freightForm = this.fb.group({
//       // Form fields
//       ntkmsTarget: ['', Validators.required],
//       ntkmsThisYearMonth: ['', Validators.required],
//       ntkmsLastYearMonth: ['', Validators.required],
//       ntkmsThisYearCumulative: ['', Validators.required],
//       ntkmsLastYearCumulative: ['', Validators.required],
//       leadTarget: ['', Validators.required],
//       leadThisYearMonth: ['', Validators.required],
//       leadLastYearMonth: ['', Validators.required],
//       leadThisYearCumulative: ['', Validators.required],
//       leadLastYearCumulative: ['', Validators.required]
//       // Baaki ke fields bhi aap yahan add kar sakte hain
//     });

//     // Page load hote hi saara data fetch karo
//     this.setupAutoCalculation();
//   }
//   createDataGroup() {
//     return this.fb.group({
//       target: [''],
//       units: [''],
//       forMonthThisYear: [0],
//       forMonthLastYear: [0],
//       uptoMonthThisYear: [0],
//       uptoMonthLastYear: [0],
//       var: [{ value: 0, disabled: true }] 
//     });
//   }

//   setupAutoCalculation(): void {
//     const formGroups = ['ntkms', 'lead', 'loadingRakes', 'loadingWagons', 'loadingTonnes', 'locoHoldingDiesel', 'locoHoldingElectric', 'locoUtilisationDiesel', 'locoUtilisationElectric', 'rakeHoldingBOBYN'];

//     formGroups.forEach(groupName => {
//       const group = this.freightForm.get(groupName) as FormGroup;
//       group.get('forMonthThisYear')?.valueChanges.subscribe(() => this.calculateVar(group));
//       group.get('forMonthLastYear')?.valueChanges.subscribe(() => this.calculateVar(group));
//     });
//   }

//   calculateVar(group: FormGroup): void {
//     const thisYear = group.get('forMonthThisYear')?.value;
//     const lastYear = group.get('forMonthLastYear')?.value;

//     if (lastYear > 0) {
//       const variance = ((thisYear - lastYear) / lastYear) * 100;
//       // Result ko 2 decimal places tak round off karo
//       group.get('var')?.setValue(variance.toFixed(2), { emitEvent: false });
//     } else {
//       group.get('var')?.setValue(0, { emitEvent: false });
//     }
//   }

//   // Backend se saara data fetch karne ka method
//   loadData() {
//     this.http.get<any[]>('http://localhost:8080/api/freight')
//       .subscribe({
//         next: (data) => {
//           this.submittedData = data;
//           console.log('Data loaded successfully!', data);
//         },
//         error: (error) => {
//           console.error('Error loading data', error);
//           alert('Could not load existing data.');
//         }
//       });
//   }

//   // Form submit karne ka method
//   onSubmit() {
//     if (this.freightForm.valid) {
//       this.http.post('http://localhost:8080/api/freight', this.freightForm.value)
//         .subscribe({
//           next: (response) => {
//             console.log('Data submitted successfully', response);
//             alert('Submission successful!'); // <-- SUCCESS MESSAGE
//             this.freightForm.reset(); // Form ko khaali karo
//             this.loadData(); // List ko refresh karo
//           },
//           error: (error) => {
//             console.error('Error submitting data', error);
//             alert('Error submitting data. Please try again.');
//           }
//         });
//     } else {
//       alert('Please fill all the fields');
//     }
//   }
//   onReset(): void {
//   this.freightForm.reset();
// }

//   // Data edit karne ka method (abhi ke liye placeholder)
//   onEdit(data: any) {
//     console.log('Editing data:', data);
//     alert('Edit functionality will be implemented soon!');
//   }
  
//   // Logout ka method
//   logout() {
//     // TODO: Token clear karne ka logic yahan aayega
//     alert('Logged out successfully!');
//     this.router.navigate(['/login']); // Login page par waapas jao
//   }
// }