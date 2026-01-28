import { Component } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { isNil, isNumber, last } from 'lodash';
import { IArrayControl, IArrayGroup } from './array-control.interface';
import { ControlBlock } from '../control-block/control-block';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-array-control',
  imports: [ReactiveFormsModule, ControlBlock, Button],
  templateUrl: './array-control.html',
  styleUrl: './array-control.scss',
})
export class ArrayControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: IArrayControl;
  declare formContext: FormArray;
  protected groups: IArrayGroup[] = [];

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService
  ) {
    super(controlContainer, formService);
  }

  load(control: IControl): void {
    super.add(control, 'array');
    this.addGroups();
  }

  override add(control: IControl, form_type?: string) {
    this.formService.addControl(this.formContext, control, form_type);
  }
  
  protected addGroup() {
    const lastGroup = this.groups[this.groups.length - 1];
    if (this.groups.length === this.control.add_config?.limit) {
      throw {code: 'limit-was-reach-out', message: "Limit was reach out"}
    }
    if (!isNumber(lastGroup.id)) {
      lastGroup.id = 0;
      this.add(this.control, 'group');
      this.cdr.detectChanges();
      return;
    }
    const newGroup = {...lastGroup, id: lastGroup.id + 1}
    this.add(this.control, 'group');
    this.groups.push(newGroup);
  }

  protected deleteGroup(index: number) {
    if (this.groups.length === 1) {
      const lastGroup = this.groups[this.groups.length - 1];
      lastGroup.id = undefined;
      this.formContext.removeAt(0);
      return;
    }
    this.formContext.removeAt(index);
    this.groups.splice(index, 1);
    this.formContext.updateValueAndValidity();
  }

  protected isNull(value: any) {
    return isNil(value);
  }

  private addGroups() {
    const newGroup: IArrayGroup = {
      blocks: this.control.blocks || [],
      id: this.control.has_initial ? 0 : undefined
    }
    this.groups.push(newGroup);
    for (const group of this.groups) {
      if (group.id === undefined) continue;
      this.add(this.control, 'group');
    }
  }

}
