import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authenticatedGuard: CanMatchFn = (route, segments) => {
  let auth = inject(AuthService)
  return auth.$isLoggedIn();
};
