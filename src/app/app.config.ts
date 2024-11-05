import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,withComponentInputBinding()), 
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({"projectId":"recetario-313a1","appId":"1:253920132122:web:eb7c39ab4ba8b7f64f25a3","storageBucket":"recetario-313a1.appspot.com","apiKey":"AIzaSyBsq-nQJVWbz2Xm58w87oOS5_rLYFHxMCU","authDomain":"recetario-313a1.firebaseapp.com","messagingSenderId":"253920132122","measurementId":"G-KK3JSS24BG"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
  ]
};
