import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { ILayoutActionConfig } from '../../layout/interfaces/layout.interface';
import { LayoutCoreService } from '../../layout/services/layout-core/layout-core.service';
import { isNil } from 'lodash';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-action-buttons',
  imports: [Button],
  templateUrl: './action-buttons.html',
  styleUrl: './action-buttons.scss',
})
export class ActionButtons implements OnInit {

  @Input() showCancel = true;
  @Input() showBack = true;
  @Input() showNext = true;
  @Input() disableNext = true;
  @Input() cancelText = 'Cancel';
  @Input() backText = 'Back';
  @Input() nextText = 'Next';

  public cancelFlag!: boolean;
  public backFlag!: boolean;
  public nextFlag!: boolean;

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();

  public actionConfig: ILayoutActionConfig = {};

  constructor(
    @Optional() private layoutCoreService: LayoutCoreService
  ) {}

  ngOnInit(): void {
      let actionConfig: ILayoutActionConfig;
      if (this.layoutCoreService) {
        const layout = this.layoutCoreService.getLayout();
        actionConfig = layout?.action_config!;
      }
      this.actionConfig.cancel_text = isNil(actionConfig!.cancel_text) ? this.cancelText : actionConfig!.cancel_text;
      this.actionConfig.back_text = isNil(actionConfig!.back_text) ? this.backText : actionConfig!.back_text;
      this.actionConfig.next_text = isNil(actionConfig!.next_text) ? this.nextText : actionConfig!.next_text;
      this.actionConfig.show_cancel = isNil(actionConfig!.show_cancel) ? this.showCancel : actionConfig!.show_cancel;
      this.actionConfig.show_back = isNil(actionConfig!.show_back) ? this.showBack : actionConfig!.show_back;
      this.actionConfig.show_next = isNil(actionConfig!.show_next) ? this.showNext : actionConfig!.show_next;
  }

}
