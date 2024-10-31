import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
    {path:"landing", component:LandingComponent}, //ANSIOSO
    {path:"login" , loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)},//LAZY
    {path:"home/:type", loadComponent: () => import('./pages/home/home.component').then(m=>m.HomeComponent)}, //LAZY
    {path:"home", redirectTo: '/home/category', pathMatch:"full"}, //Si entra en HOME, le redirecciona
    {path:"recipes/:type/:ingredient",loadComponent: () => import('./pages/list-recipes/list-recipes.component').then(m=>m.ListRecipesComponent)},//LAZY
    {path:"recipe/:id", loadComponent: () => import('./pages/view-recipe/view-recipe.component').then(m=>m.ViewRecipeComponent)},//LAZY
    {path: "", redirectTo: "/landing", pathMatch:"full"},
    {path:"**",component:ErrorPageComponent}//ANSIOSO
];
