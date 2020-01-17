import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppWrapperComponent } from './app/app-wrapper.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: '',
    component: AppWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'feature-list',
        loadChildren: () => import('./features/feature-list/feature-list.module').then(m => m.FeatureListModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'examples',
        loadChildren: () => import('./features/examples/examples.module').then(m => m.ExamplesModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
