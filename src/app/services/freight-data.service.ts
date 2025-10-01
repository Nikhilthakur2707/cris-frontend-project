import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreightDataService {
  private baseUrl = 'http://localhost:8080/api/freight';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const tokenData = localStorage.getItem('token');
    console.log('Raw token data from localStorage:', tokenData);
    
    let token = tokenData;
    
    // Check if token is stored as JSON object and extract the actual token
    if (tokenData && tokenData.startsWith('{')) {
      try {
        const parsedToken = JSON.parse(tokenData);
        token = parsedToken.token;
        console.log('Extracted token from JSON:', token);
      } catch (e) {
        console.error('Error parsing token JSON:', e);
      }
    }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if (token && token !== 'null') {
      console.log('Adding Authorization header with token:', token.substring(0, 20) + '...');
      return headers.set('Authorization', `Bearer ${token}`);
    }
    
    console.error('No valid token found in localStorage');
    return headers;
  }

  saveFreightData(freightData: any): Observable<any> {
    // Transform the frontend form data to match your backend FreightData model
    const backendData = this.transformToBackendFormat(freightData);
    console.log('Sending data to backend:', backendData);
    console.log('Using headers:', this.getHeaders());
    
    return this.http.post(this.baseUrl, backendData, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(response => console.log('Backend response:', response)),
      catchError(error => {
        console.error('Error details:', error);
        throw error;
      })
    );
  }

  private transformToBackendFormat(frontendData: any): any {
    // Transform nested form structure to flat structure matching your FreightData model
    return {
      forDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      
      // NTKMs fields
      ntkmsTarget: frontendData.ntkms?.target || null,
      ntkmsForMonthThisYear: frontendData.ntkms?.forMonthThisYear || null,
      ntkmsForMonthLastYear: frontendData.ntkms?.forMonthLastYear || null,
      ntkmsUptoMonthThisYear: frontendData.ntkms?.upToMonthThisYear || null,
      ntkmsUptoMonthLastYear: frontendData.ntkms?.upToMonthLastYear || null,
      
      // Lead fields
      leadTarget: frontendData.lead?.target || null,
      leadForMonthThisYear: frontendData.lead?.forMonthThisYear || null,
      leadForMonthLastYear: frontendData.lead?.forMonthLastYear || null,
      leadUptoMonthThisYear: frontendData.lead?.upToMonthThisYear || null,
      leadUptoMonthLastYear: frontendData.lead?.upToMonthLastYear || null,
      
      // Loading Rakes fields
      loadingRakesTarget: frontendData.loadingRakes?.target || null,
      loadingRakesForMonthThisYear: frontendData.loadingRakes?.forMonthThisYear || null,
      loadingRakesForMonthLastYear: frontendData.loadingRakes?.forMonthLastYear || null,
      loadingRakesUptoMonthThisYear: frontendData.loadingRakes?.upToMonthThisYear || null,
      loadingRakesUptoMonthLastYear: frontendData.loadingRakes?.upToMonthLastYear || null,
      
      // Loading Wagons fields
      loadingWagonsTarget: frontendData.loadingWagons?.target || null,
      loadingWagonsForMonthThisYear: frontendData.loadingWagons?.forMonthThisYear || null,
      loadingWagonsForMonthLastYear: frontendData.loadingWagons?.forMonthLastYear || null,
      loadingWagonsUptoMonthThisYear: frontendData.loadingWagons?.upToMonthThisYear || null,
      loadingWagonsUptoMonthLastYear: frontendData.loadingWagons?.upToMonthLastYear || null,
      
      // Loco Utilisation Diesel fields
      locoUtilisationDieselTarget: frontendData.locoUtilisationDiesel?.target || null,
      locoUtilisationDieselForMonthThisYear: frontendData.locoUtilisationDiesel?.forMonthThisYear || null,
      locoUtilisationDieselForMonthLastYear: frontendData.locoUtilisationDiesel?.forMonthLastYear || null,
      locoUtilisationDieselUptoMonthThisYear: frontendData.locoUtilisationDiesel?.upToMonthThisYear || null,
      locoUtilisationDieselUptoMonthLastYear: frontendData.locoUtilisationDiesel?.upToMonthLastYear || null,
      
      // Loco Utilisation Electric fields
      locoUtilisationElectricTarget: frontendData.locoUtilisationElectric?.target || null,
      locoUtilisationElectricForMonthThisYear: frontendData.locoUtilisationElectric?.forMonthThisYear || null,
      locoUtilisationElectricForMonthLastYear: frontendData.locoUtilisationElectric?.forMonthLastYear || null,
      locoUtilisationElectricUptoMonthThisYear: frontendData.locoUtilisationElectric?.upToMonthThisYear || null,
      locoUtilisationElectricUptoMonthLastYear: frontendData.locoUtilisationElectric?.upToMonthLastYear || null
    };
  }

  getFreightData(userId?: string): Observable<any> {
    const url = userId ? `${this.baseUrl}/${userId}` : this.baseUrl;
    return this.http.get(url, { 
      headers: this.getHeaders() 
    });
  }

  updateFreightData(id: string, freightData: any): Observable<any> {
    const backendData = this.transformToBackendFormat(freightData);
    return this.http.put(`${this.baseUrl}/${id}`, backendData, { 
      headers: this.getHeaders() 
    });
  }

  deleteFreightData(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { 
      headers: this.getHeaders() 
    });
  }
}