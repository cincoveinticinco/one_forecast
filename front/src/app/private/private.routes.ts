import { Routes } from '@angular/router';

export const PrivateRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./private').then(c => c.Private),
        children: [
            {
                path: 'tenants',
                loadComponent: () => import('./tenants/tenants').then(c => c.Tenants)
            },
            {
                path: ':id/form_templates',
                loadComponent: () => import('./templates/templates').then(c => c.Templates)
            },
            {
                path: ':tenant_id/form_responses/:id',
                loadComponent: () => import('./template-responses/template-responses').then(c => c.TemplateResponses)
            },
            {
                path: ':tenantSlug/:formTemplateSlug/:isEditing',
                loadComponent: () => import('./render-template/render-template').then(c => c.RenderTemplate)
            },
            {
                path: ':id/workflows',
                loadComponent: () => import('./workflows/workflows').then(c => c.Workflows)
            },
            {
                path: ':tenant_id/workflow/steps/:id',
                loadComponent: () => import('./workflow-steps/workflow-steps').then(c => c.WorkflowSteps)
            },
            {
                path: '**',
                redirectTo: 'tenants'
            }
        ]
    }
];
