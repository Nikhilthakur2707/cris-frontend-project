// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, Observable, tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class FreightDataService {
//   private baseUrl = 'http://localhost:8080/api/freight';

//   constructor(private http: HttpClient) { }

//   private getHeaders(): HttpHeaders {
//     const tokenData = localStorage.getItem('token');
//     console.log('Raw token data from localStorage:', tokenData);
    
//     let token = tokenData;
    
//     // Check if token is stored as JSON object and extract the actual token
//     if (tokenData && tokenData.startsWith('{')) {
//       try {
//         const parsedToken = JSON.parse(tokenData);
//         token = parsedToken.token;
//         console.log('Extracted token from JSON:', token);
//       } catch (e) {
//         console.error('Error parsing token JSON:', e);
//       }
//     }
    
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });
    
//     if (token && token !== 'null') {
//       console.log('Adding Authorization header with token:', token.substring(0, 20) + '...');
//       return headers.set('Authorization', `Bearer ${token}`);
//     }
    
//     console.error('No valid token found in localStorage');
//     return headers;
//   }

//   saveFreightData(freightData: any): Observable<any> {
//     // Transform the frontend form data to match your backend FreightData model
//     const backendData = this.transformToBackendFormat(freightData);
//     console.log('Sending data to backend:', backendData);
//     console.log('Using headers:', this.getHeaders());
    
//     return this.http.post(this.baseUrl, backendData, { 
//       headers: this.getHeaders() 
//     }).pipe(
//       tap(response => console.log('Backend response:', response)),
//       catchError(error => {
//         console.error('Error details:', error);
//         throw error;
//       })
//     );
//   }

//   private transformToBackendFormat(frontendData: any): any {
//     // Transform nested form structure to flat structure matching your FreightData model
//     return {
//       forDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      
//       // NTKMs fields
//       ntkmsTarget: frontendData.ntkms?.target || null,
//       ntkmsForMonthThisYear: frontendData.ntkms?.forMonthThisYear || null,
//       ntkmsForMonthLastYear: frontendData.ntkms?.forMonthLastYear || null,
//       ntkmsUptoMonthThisYear: frontendData.ntkms?.upToMonthThisYear || null,
//       ntkmsUptoMonthLastYear: frontendData.ntkms?.upToMonthLastYear || null,
      
//       // Lead fields
//       leadTarget: frontendData.lead?.target || null,
//       leadForMonthThisYear: frontendData.lead?.forMonthThisYear || null,
//       leadForMonthLastYear: frontendData.lead?.forMonthLastYear || null,
//       leadUptoMonthThisYear: frontendData.lead?.upToMonthThisYear || null,
//       leadUptoMonthLastYear: frontendData.lead?.upToMonthLastYear || null,
      
//       // Loading Rakes fields
//       loadingRakesTarget: frontendData.loadingRakes?.target || null,
//       loadingRakesForMonthThisYear: frontendData.loadingRakes?.forMonthThisYear || null,
//       loadingRakesForMonthLastYear: frontendData.loadingRakes?.forMonthLastYear || null,
//       loadingRakesUptoMonthThisYear: frontendData.loadingRakes?.upToMonthThisYear || null,
//       loadingRakesUptoMonthLastYear: frontendData.loadingRakes?.upToMonthLastYear || null,
      
//       // Loading Wagons fields
//       loadingWagonsTarget: frontendData.loadingWagons?.target || null,
//       loadingWagonsForMonthThisYear: frontendData.loadingWagons?.forMonthThisYear || null,
//       loadingWagonsForMonthLastYear: frontendData.loadingWagons?.forMonthLastYear || null,
//       loadingWagonsUptoMonthThisYear: frontendData.loadingWagons?.upToMonthThisYear || null,
//       loadingWagonsUptoMonthLastYear: frontendData.loadingWagons?.upToMonthLastYear || null,
      
//       // Loco Utilisation Diesel fields
//       locoUtilisationDieselTarget: frontendData.locoUtilisationDiesel?.target || null,
//       locoUtilisationDieselForMonthThisYear: frontendData.locoUtilisationDiesel?.forMonthThisYear || null,
//       locoUtilisationDieselForMonthLastYear: frontendData.locoUtilisationDiesel?.forMonthLastYear || null,
//       locoUtilisationDieselUptoMonthThisYear: frontendData.locoUtilisationDiesel?.upToMonthThisYear || null,
//       locoUtilisationDieselUptoMonthLastYear: frontendData.locoUtilisationDiesel?.upToMonthLastYear || null,
      
//       // Loco Utilisation Electric fields
//       locoUtilisationElectricTarget: frontendData.locoUtilisationElectric?.target || null,
//       locoUtilisationElectricForMonthThisYear: frontendData.locoUtilisationElectric?.forMonthThisYear || null,
//       locoUtilisationElectricForMonthLastYear: frontendData.locoUtilisationElectric?.forMonthLastYear || null,
//       locoUtilisationElectricUptoMonthThisYear: frontendData.locoUtilisationElectric?.upToMonthThisYear || null,
//       locoUtilisationElectricUptoMonthLastYear: frontendData.locoUtilisationElectric?.upToMonthLastYear || null
//     };
//   }

//   getFreightData(userId?: string): Observable<any> {
//     const url = userId ? `${this.baseUrl}/${userId}` : this.baseUrl;
//     return this.http.get(url, { 
//       headers: this.getHeaders() 
//     });
//   }

//   updateFreightData(id: string, freightData: any): Observable<any> {
//     const backendData = this.transformToBackendFormat(freightData);
//     return this.http.put(`${this.baseUrl}/${id}`, backendData, { 
//       headers: this.getHeaders() 
//     });
//   }

//   deleteFreightData(id: string): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/${id}`, { 
//       headers: this.getHeaders() 
//     });
//   }
// }
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
      locoUtilisationElectricUptoMonthLastYear: frontendData.locoUtilisationElectric?.upToMonthLastYear || null,

      // Rake Holding Boxn fields
      rakeHoldingBoxnTarget: frontendData.rakeHoldingBoxn?.target || null,
      rakeHoldingBoxnForMonthThisYear: frontendData.rakeHoldingBoxn?.forMonthThisYear || null,
      rakeHoldingBoxnForMonthLastYear: frontendData.rakeHoldingBoxn?.forMonthLastYear || null,
      rakeHoldingBoxnUptoMonthThisYear: frontendData.rakeHoldingBoxn?.upToMonthThisYear || null,
      rakeHoldingBoxnUptoMonthLastYear: frontendData.rakeHoldingBoxn?.upToMonthLastYear || null,

      // Rake Holding Bcn fields
      rakeHoldingBcnTarget: frontendData.rakeHoldingBcn?.target || null,
      rakeHoldingBcnForMonthThisYear: frontendData.rakeHoldingBcn?.forMonthThisYear || null,
      rakeHoldingBcnForMonthLastYear: frontendData.rakeHoldingBcn?.forMonthLastYear || null,
      rakeHoldingBcnUptoMonthThisYear: frontendData.rakeHoldingBcn?.upToMonthThisYear || null,
      rakeHoldingBcnUptoMonthLastYear: frontendData.rakeHoldingBcn?.upToMonthLastYear || null,

      // Rake Holdings Bobrn fields
      rakeHoldingBobrnTarget: frontendData.rakeHoldingBobrn?.target || null,
      rakeHoldingBobrnForMonthThisYear: frontendData.rakeHoldingBobrn?.forMonthThisYear || null,
      rakeHoldingBobrnForMonthLastYear: frontendData.rakeHoldingBobrn?.forMonthLastYear || null,
      rakeHoldingBobrnUptoMonthThisYear: frontendData.rakeHoldingBobrn?.upToMonthThisYear || null,
      rakeHoldingBobrnUptoMonthLastYear: frontendData.rakeHoldingBobrn?.upToMonthLastYear || null,

      // Rake Holding - Etc fields
      rakeHoldingEtcTarget: frontendData.rakeHoldingEtc?.target || null,
      rakeHoldingEtcForMonthThisYear: frontendData.rakeHoldingEtc?.forMonthThisYear || null,
      rakeHoldingEtcForMonthLastYear: frontendData.rakeHoldingEtc?.forMonthLastYear || null,
      rakeHoldingEtcUptoMonthThisYear: frontendData.rakeHoldingEtc?.upToMonthThisYear || null,
      rakeHoldingEtcUptoMonthLastYear: frontendData.rakeHoldingEtc?.upToMonthLastYear || null,

      // Avg reward release - BOXN fields
      avgRewardReleaseBoxnTarget: frontendData.avgRewardReleaseBoxn?.target || null,
      avgRewardReleaseBoxnForMonthThisYear: frontendData.avgRewardReleaseBoxn?.forMonthThisYear || null,
      avgRewardReleaseBoxnForMonthLastYear: frontendData.avgRewardReleaseBoxn?.forMonthLastYear || null,
      avgRewardReleaseBoxnUptoMonthThisYear: frontendData.avgRewardReleaseBoxn?.upToMonthThisYear || null,
      avgRewardReleaseBoxnUptoMonthLastYear: frontendData.avgRewardReleaseBoxn?.upToMonthLastYear || null,

      // Avg reward release - BCN fields
      avgRewardReleaseBcnTarget: frontendData.avgRewardReleaseBcn?.target || null,
      avgRewardReleaseBcnForMonthThisYear: frontendData.avgRewardReleaseBcn?.forMonthThisYear || null,
      avgRewardReleaseBcnForMonthLastYear: frontendData.avgRewardReleaseBcn?.forMonthLastYear || null,
      avgRewardReleaseBcnUptoMonthThisYear: frontendData.avgRewardReleaseBcn?.upToMonthThisYear || null,
      avgRewardReleaseBcnUptoMonthLastYear: frontendData.avgRewardReleaseBcn?.upToMonthLastYear || null,

      // Avg reward release - BOBRN fields
      avgRewardReleaseBobrnTarget: frontendData.avgRewardReleaseBobrn?.target || null,
      avgRewardReleaseBobrnForMonthThisYear: frontendData.avgRewardReleaseBobrn?.forMonthThisYear || null,
      avgRewardReleaseBobrnForMonthLastYear: frontendData.avgRewardReleaseBobrn?.forMonthLastYear || null,
      avgRewardReleaseBobrnUptoMonthThisYear: frontendData.avgRewardReleaseBobrn?.upToMonthThisYear || null,
      avgRewardReleaseBobrnUptoMonthLastYear: frontendData.avgRewardReleaseBobrn?.upToMonthLastYear || null,

      // Outward Madeover fields
      OutwardMadeoverTarget: frontendData.OutwardMadeover?.target || null,
      OutwardMadeoverForMonthThisYear: frontendData.OutwardMadeover?.forMonthThisYear || null,
      OutwardMadeoverForMonthLastYear: frontendData.OutwardMadeover?.forMonthLastYear || null,
      OutwardMadeoverUptoMonthThisYear: frontendData.OutwardMadeover?.upToMonthThisYear || null,
      OutwardMadeoverUptoMonthLastYear: frontendData.OutwardMadeover?.upToMonthLastYear || null,

      // Empty converted into loading fields
      emptyConvertedTarget: frontendData.emptyConverted?.target || null,
      emptyConvertedForMonthThisYear: frontendData.emptyConverted?.forMonthThisYear || null,
      emptyConvertedForMonthLastYear: frontendData.emptyConverted?.forMonthLastYear || null,
      emptyConvertedUptoMonthThisYear: frontendData.emptyConverted?.upToMonthThisYear || null,
      emptyConvertedUptoMonthLastYear: frontendData.emptyConverted?.upToMonthLastYear || null,

      // Rake Loading - BOXN fields
      rakeLoadingBoxnTarget: frontendData.rakeLoadingBoxn?.target || null,
      rakeLoadingBoxnForMonthThisYear: frontendData.rakeLoadingBoxn?.forMonthThisYear || null,
      rakeLoadingBoxnForMonthLastYear: frontendData.rakeLoadingBoxn?.forMonthLastYear || null,
      rakeLoadingBoxnUptoMonthThisYear: frontendData.rakeLoadingBoxn?.upToMonthThisYear || null,
      rakeLoadingBoxnUptoMonthLastYear: frontendData.rakeLoadingBoxn?.upToMonthLastYear || null,

      // Rake Loading - BCN fields
      rakeLoadingBcnTarget: frontendData.rakeLoadingBcn?.target || null,
      rakeLoadingBcnForMonthThisYear: frontendData.rakeLoadingBcn?.forMonthThisYear || null,
      rakeLoadingBcnForMonthLastYear: frontendData.rakeLoadingBcn?.forMonthLastYear || null,
      rakeLoadingBcnUptoMonthThisYear: frontendData.rakeLoadingBcn?.upToMonthThisYear || null,
      rakeLoadingBcnUptoMonthLastYear: frontendData.rakeLoadingBcn?.upToMonthLastYear || null,

      //Rake Loading - BOBRN fields
      rakeLoadingBobrnTarget: frontendData.rakeLoadingBobrn?.target || null,
      rakeLoadingBobrnForMonthThisYear: frontendData.rakeLoadingBobrn?.forMonthThisYear || null,
      rakeLoadingBobrnForMonthLastYear: frontendData.rakeLoadingBobrn?.forMonthLastYear || null,
      rakeLoadingBobrnUptoMonthThisYear: frontendData.rakeLoadingBobrn?.upToMonthThisYear || null,
      rakeLoadingBobrnUptoMonthLastYear: frontendData.rakeLoadingBobrn?.upToMonthLastYear || null,

      //Rake Loading - Steel fields
      rakeLoadingSteelTarget: frontendData.rakeLoadingSteel?.target || null,
      rakeLoadingSteelForMonthThisYear: frontendData.rakeLoadingSteel?.forMonthThisYear || null,
      rakeLoadingSteelForMonthLastYear: frontendData.rakeLoadingSteel?.forMonthLastYear || null,
      rakeLoadingSteelUptoMonthThisYear: frontendData.rakeLoadingSteel?.upToMonthThisYear || null,
      rakeLoadingSteelUptoMonthLastYear: frontendData.rakeLoadingSteel?.upToMonthLastYear || null,
      
      //Train Interchange - Made over fields
      trainInterchangeMadeOverTarget: frontendData.trainInterchangeMadeOver?.target || null,
      trainInterchangeMadeOverForMonthThisYear: frontendData.trainInterchangeMadeOver?.forMonthThisYear || null,
      trainInterchangeMadeOverForMonthLastYear: frontendData.trainInterchangeMadeOver?.forMonthLastYear || null,
      trainInterchangeMadeOverUptoMonthThisYear: frontendData.trainInterchangeMadeOver?.upToMonthThisYear || null,
      trainInterchangeMadeOverUptoMonthLastYear: frontendData.trainInterchangeMadeOver?.upToMonthLastYear || null,

      //Train Interchange - taken over fields
      trainInterchangeTakenOverTarget: frontendData.trainInterchangeTakenOver?.target || null,
      trainInterchangeTakenOverForMonthThisYear: frontendData.trainInterchangeTakenOver?.forMonthThisYear || null,
      trainInterchangeTakenOverForMonthLastYear: frontendData.trainInterchangeTakenOver?.forMonthLastYear || null,
      trainInterchangeTakenOverUptoMonthThisYear: frontendData.trainInterchangeTakenOver?.upToMonthThisYear || null,
      trainInterchangeTakenOverUptoMonthLastYear: frontendData.trainInterchangeTakenOver?.upToMonthLastYear || null,

      //Embedded Empty- BOXN fields
      embeddedEmptyBoxnTarget: frontendData.embeddedEmptyBoxn?.target || null,
      embeddedEmptyBoxnForMonthThisYear: frontendData.embeddedEmptyBoxn?.forMonthThisYear || null,
      embeddedEmptyBoxnForMonthLastYear: frontendData.embeddedEmptyBoxn?.forMonthLastYear || null,
      embeddedEmptyBoxnUptoMonthThisYear: frontendData.embeddedEmptyBoxn?.upToMonthThisYear || null,
      embeddedEmptyBoxnUptoMonthLastYear: frontendData.embeddedEmptyBoxn?.upToMonthLastYear || null,

      //Embedded Empty - BCN fields
      embeddedEmptyBcnTarget: frontendData.embeddedEmptyBcn?.target || null,
      embeddedEmptyBcnForMonthThisYear: frontendData.embeddedEmptyBcn?.forMonthThisYear || null,
      embeddedEmptyBcnForMonthLastYear: frontendData.embeddedEmptyBcn?.forMonthLastYear || null,
      embeddedEmptyBcnUptoMonthThisYear: frontendData.embeddedEmptyBcn?.upToMonthThisYear || null,
      embeddedEmptyBcnUptoMonthLastYear: frontendData.embeddedEmptyBcn?.upToMonthLastYear || null,

      //Embedded Empty - BOBRN fields
      embeddedEmptyBobrnTarget: frontendData.embeddedEmptyBobrn?.target || null,
      embeddedEmptyBobrnForMonthThisYear: frontendData.embeddedEmptyBobrn?.forMonthThisYear || null,
      embeddedEmptyBobrnForMonthLastYear: frontendData.embeddedEmptyBobrn?.forMonthLastYear || null,
      embeddedEmptyBobrnUptoMonthThisYear: frontendData.embeddedEmptyBobrn?.upToMonthThisYear || null,
      embeddedEmptyBobrnUptoMonthLastYear: frontendData.embeddedEmptyBobrn?.upToMonthLastYear || null,

      //Short Loads- BOXN fields
      shortLoadsBoxnTarget: frontendData.shortLoadsBoxn?.target || null,
      shortLoadsBoxnForMonthThisYear: frontendData.shortLoadsBoxn?.forMonthThisYear || null,
      shortLoadsBoxnForMonthLastYear: frontendData.shortLoadsBoxn?.forMonthLastYear || null,
      shortLoadsBoxnUptoMonthThisYear: frontendData.shortLoadsBoxn?.upToMonthThisYear || null,
      shortLoadsBoxnUptoMonthLastYear: frontendData.shortLoadsBoxn?.upToMonthLastYear || null,

      //Short Loads - BCN fields
      shortLoadsBcnTarget: frontendData.shortLoadsBcn?.target || null,
      shortLoadsBcnForMonthThisYear: frontendData.shortLoadsBcn?.forMonthThisYear || null,
      shortLoadsBcnForMonthLastYear: frontendData.shortLoadsBcn?.forMonthLastYear || null,
      shortLoadsBcnUptoMonthThisYear: frontendData.shortLoadsBcn?.upToMonthThisYear || null,
      shortLoadsBcnUptoMonthLastYear: frontendData.shortLoadsBcn?.upToMonthLastYear || null,

      //Short Loads - BOBRN fields
      shortLoadsBobrnTarget: frontendData.shortLoadsBobrn?.target || null,
      shortLoadsBobrnForMonthThisYear: frontendData.shortLoadsBobrn?.forMonthThisYear || null,
      shortLoadsBobrnForMonthLastYear: frontendData.shortLoadsBobrn?.forMonthLastYear || null,
      shortLoadsBobrnUptoMonthThisYear: frontendData.shortLoadsBobrn?.upToMonthThisYear || null,
      shortLoadsBobrnUptoMonthLastYear: frontendData.shortLoadsBobrn?.upToMonthLastYear || null,

      //Average Speed fields
      averageSpeedTarget: frontendData.averageSpeed?.target || null,
      averageSpeedForMonthThisYear: frontendData.averageSpeed?.forMonthThisYear || null,
      averageSpeedForMonthLastYear: frontendData.averageSpeed?.forMonthLastYear || null,
      averageSpeedUptoMonthThisYear: frontendData.averageSpeed?.upToMonthThisYear || null,
      averageSpeedUptoMonthLastYear: frontendData.averageSpeed?.upToMonthLastYear || null,

      //Wagon Holding fields
      wagonHoldingTarget: frontendData.wagonHolding?.target || null,
      wagonHoldingForMonthThisYear: frontendData.wagonHolding?.forMonthThisYear || null,
      wagonHoldingForMonthLastYear: frontendData.wagonHolding?.forMonthLastYear || null,
      wagonHoldingUptoMonthThisYear: frontendData.wagonHolding?.upToMonthThisYear || null,
      wagonHoldingUptoMonthLastYear: frontendData.wagonHolding?.upToMonthLastYear || null,

      //Wagon turnaround fields
      wagonTurnaroundTarget: frontendData.wagonTurnaround?.target || null,
      wagonTurnaroundForMonthThisYear: frontendData.wagonTurnaround?.forMonthThisYear || null,
      wagonTurnaroundForMonthLastYear: frontendData.wagonTurnaround?.forMonthLastYear || null,
      wagonTurnaroundUptoMonthThisYear: frontendData.wagonTurnaround?.upToMonthThisYear || null,
      wagonTurnaroundUptoMonthLastYear: frontendData.wagonTurnaround?.upToMonthLastYear || null,

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