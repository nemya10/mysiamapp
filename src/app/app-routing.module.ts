import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'lool',
    loadChildren: () => import('./auth/page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)
  },
  {
    path: 'forgetpass',
    loadChildren: () => import('./auth/forgetpass/forgetpass.module').then( m => m.ForgetpassPageModule)
  },
  {
    path: 'calendhome',
    loadChildren: () => import('./calendhome/calendhome.module').then( m => m.CalendhomePageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
