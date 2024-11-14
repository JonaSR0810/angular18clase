import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  auth = inject(AuthService);
  router = inject(Router);
  // skipFirst:boolean = true
  constructor() {
    effect(() => {
      // console.log(this.auth.$isLoggedIn())
      // if (this.skipFirst){
      //   this.skipFirst = false;
      //   return;
      // }

      // console.log("EFECTO"+this.auth.$isLoggedIn());
      if (this.auth.$isLoggedIn()) {
        this.router.navigate(['home']);
      }
    })
  }
}