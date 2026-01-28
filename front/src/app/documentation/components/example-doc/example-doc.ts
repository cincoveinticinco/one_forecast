import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DynamicStepBase } from '../../../lib/dynamic-step.base';
import { LayoutComponent } from '../../../components/layout/lib/layout/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionButtons } from '../../../components/shared/action-buttons/action-buttons';
import { MenuProgress } from '../../../shared/menu-progress/menu-progress';
import { IFormSubmission } from '../../../components/layout/interfaces/form-submission.interface';
import { Button } from 'primeng/button';
import { transformLayout } from '../../../helpers/layout/tranform-layout';
import { Router } from '@angular/router';
import { IFormTemplate } from '../../../interfaces/field-layout-back.interface';
import { FormTemplateService } from '../../../components/layout/services/form-template/form-template.service';

@Component({
  selector: 'app-example-doc',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './example-doc.html',
  styleUrl: './example-doc.scss',
})
export class ExampleDoc implements OnInit {

  protected formTemplates: IFormTemplate[] = [];
  private router = inject(Router);
  private formTemplateService = inject(FormTemplateService);
  private cdr = inject(ChangeDetectorRef);

  async ngOnInit() {
    this.formTemplates = await this.formTemplateService.findAll() ?? [];
    this.cdr.detectChanges();
  }

  async viewForm(form_tenant_slug: string, form_template_id: number) {
    this.router.navigate(['docs', 'render', form_tenant_slug, form_template_id, 0]);
  }
  
  async viewFormResults(form_tenant_slug: string, form_template_id: number) {
    this.router.navigate(['docs', 'render', form_tenant_slug, form_template_id, 1]);
  }

  

}
