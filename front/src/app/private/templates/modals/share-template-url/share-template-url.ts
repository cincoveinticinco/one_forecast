import { Component, inject, Input } from '@angular/core';
import { DynamicDialog } from '../../../../lib/dynamic-dialog.base';
import { Button } from 'primeng/button';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-share-template-url',
  imports: [Button],
  templateUrl: './share-template-url.html',
  styleUrl: './share-template-url.scss',
})
export class ShareTemplateUrl extends DynamicDialog {

  @Input() urlFront: string = '';
  @Input() close!: () => void;
  private clipboard = inject(Clipboard);

  constructor() {
    super();
  }

  copy() {
    this.clipboard.copy(this.urlFront);
    this.openToast('info', 'Form template url copied');
    this.close();
  }

}
