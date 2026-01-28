import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'docs',
        loadChildren: () => import('./documentation/documentation.routes').then(r => r.DocumentationRoutes)
    },
    {
        path: '',
        loadChildren: () => import('./private/private.routes').then(c => c.PrivateRoutes)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
