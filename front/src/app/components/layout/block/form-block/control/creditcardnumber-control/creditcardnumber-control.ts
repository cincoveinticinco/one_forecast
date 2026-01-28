import { Component } from '@angular/core';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { ControlContainer, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { Label } from '../../partials/label/label';
import { ErrorControl } from '../../partials/error-control/error-control';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';
import { ICreditcardnumberControl } from './creditcardnumber-control.interface';

@Component({
  selector: 'app-creditcardnumber-control',
  imports: [ ReactiveFormsModule, Label, ErrorControl, LabelBehaviorDirective ],
  templateUrl: './creditcardnumber-control.html',
  styleUrl: './creditcardnumber-control.scss',
})
export class CreditcardnumberControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: ICreditcardnumberControl;
  protected isInvalid = false;
  private rawValue = '';
  private lastKey = '';

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
  ) {
    super(controlContainer, formService);
  }

  load(control: IControl): void {
    this.add(control);
  }

  onKeyDown(event: KeyboardEvent) {
    this.lastKey = event.key;
    //special keys
    if (
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)
    ) {
      return;
    }
    //avoid letter keys
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    //Max length of numbers
    if (this.rawValue.length >= 16) {
      event.preventDefault();
    }
  }

  onInput(event: Event) {
    const el = event.target as HTMLElement;

    if (this.lastKey === 'Backspace') {
      this.rawValue = this.rawValue.slice(0, -1);
    } else if (/^\d$/.test(this.lastKey)) {
      this.rawValue += this.lastKey;
    }

    this.setInvalid();

    el.innerText = this.mask(this.rawValue);
    this.moveCursorToEnd(el);
  }

  private setInvalid() {
    this.isInvalid = this.rawValue.length === 0;
    this.formContext.markAsDirty();
    this.formContext.markAsTouched();
    if (this.isInvalid && this.control.validators?.some(validator => validator.validator_type === 'required')) {
      this.formContext.addValidators(Validators.required);
    } else {
      this.formContext.removeValidators(Validators.required)
    }
    this.formContext.patchValue(this.rawValue, { emitEvent: false })
    this.formContext.updateValueAndValidity();
  }

  private mask(value: string): string {
    if (!value) return '';
    const separateDigits: number = this.control.number_to_show || 4;

    const last = value.slice(-separateDigits);
    const stars = '*'.repeat(Math.max(0, value.length - separateDigits));

    return (stars + last)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  private moveCursorToEnd(el: HTMLElement) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

}

