import { AfterViewInit, Component, Input } from '@angular/core';
import { LayoutComponent } from '../../components/layout/lib/layout/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionButtons } from '../../components/shared/action-buttons/action-buttons';
import { MenuProgress } from '../../shared/menu-progress/menu-progress';
import { DynamicStepBase } from '../../lib/dynamic-step.base';
import { transformLayout } from '../../helpers/layout/tranform-layout';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-render-template',
  imports: [LayoutComponent, ReactiveFormsModule, ActionButtons, MenuProgress, ToastModule],
  templateUrl: './render-template.html',
  styleUrl: './render-template.scss',
})
export class RenderTemplate extends DynamicStepBase {

  @Input() protected isEditing!: string;

  constructor() {
    super();
  }

  async ngOnInit() {
    // await this.findTemplate();
    // this.initLayoutSubmission();
    if (Boolean(+this.isEditing)) {
      await this.viewFormEditing();
    } else {
      await this.viewForm();
    }
  }

  //TEMP
  private async viewForm() {
    await this.findTemplate();
    this.layout = transformLayout(this.tempLayout, [this.autosave, this.getSubmissionResponse]);
    this.loading = false;
    this.cdr.detectChanges();
    await this.startLayout();
  }

  private async viewFormEditing() {
    await this.findTemplate();
    this.initLayoutSubmission();
  }

}
