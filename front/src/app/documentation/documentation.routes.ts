import { Routes } from '@angular/router';

export const DocumentationRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./documentation').then(c => c.Documentation),
        children: [
            {
                path: 'layout',
                loadComponent: () => import('./components/layout-doc/layout-doc').then(c => c.LayoutDoc)
            },
            {
                path: 'block',
                loadComponent: () => import('./components/block-doc/block-doc').then(c => c.BlockDoc)
            },
            {
                path: 'title-block-type',
                loadComponent: () => import('./components/config-block-types-doc/title-block-type-doc/title-block-type-doc').then(c => c.TitleBlockTypeDoc)
            },
            {
                path: 'form-block-type',
                loadComponent: () => import('./components/config-block-types-doc/form-block-type-doc/form-block-type-doc').then(c => c.FormBlockTypeDoc),
                children: [
                    {
                        path: 'form-control',
                        loadComponent: () => import('./components/config-block-types-doc/form-block-type-doc/form-control-doc/form-control-doc').then(c => c.FormControlDoc),
                    },
                    {
                        path: 'input-control',
                        loadComponent: () => import('./components/config-block-types-doc/form-block-type-doc/input-control-doc/input-control-doc').then(c => c.InputControlDoc),
                    },
                    {
                        path: 'array-control',
                        loadComponent: () => import('./components/config-block-types-doc/form-block-type-doc/array-control-doc/array-control-doc').then(c => c.ArrayControlDoc),
                    },
                    {
                        path: '**',
                        redirectTo: 'input-control'
                    }
                ]
            },
            {
                path: 'validator',
                loadComponent: () => import('./components/validator-doc/validator-doc').then(c => c.ValidatorDoc)
            },
            {
                path: 'example',
                loadComponent: () => import('./components/example-doc/example-doc').then(c => c.ExampleDoc)
            },
            {
                path: '**',
                redirectTo: 'layout'
            }
        ]
    }
];
