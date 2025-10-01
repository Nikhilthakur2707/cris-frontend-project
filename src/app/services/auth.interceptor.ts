import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  // Login ke time localStorage me token save hua tha
  const token = localStorage.getItem('token');

  if (token) {
    // Request clone karke usme Authorization header add karte hain
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // Agar token nahi hai to simple request forward kar do
  return next(req);
};
