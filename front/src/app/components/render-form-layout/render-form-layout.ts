import { Component, Input, OnInit } from '@angular/core';
import { DynamicStepBase } from '../../lib/dynamic-step.base';
import { MenuProgress } from '../../shared/menu-progress/menu-progress';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/lib/layout/layout';
import { ActionButtons } from '../shared/action-buttons/action-buttons';

@Component({
  selector: 'app-render-form-layout',
  imports: [ReactiveFormsModule, LayoutComponent, ActionButtons],
  templateUrl: './render-form-layout.html',
  styleUrl: './render-form-layout.scss',
})
export class RenderFormLayout extends DynamicStepBase implements OnInit {

  @Input() nextCallback!: (body: any) => Promise<void>;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initLayout();
  }

  protected next() {
    if (!this.nextCallback) throw new Error('There is not a nextCallback function to call');
    this.nextCallback(this.form.getRawValue());
  }

}
