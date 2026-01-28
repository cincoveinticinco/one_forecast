import { Component } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ErrorControl } from '../../partials/error-control/error-control';
import { Label } from '../../partials/label/label';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { IAutocompleteControl } from './autocomplete-control.interface';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { Button } from 'primeng/button';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';


@Component({
  selector: 'app-autocomplete-control',
  imports: [ AutoCompleteModule, ReactiveFormsModule, ErrorControl, Label, Button, LabelBehaviorDirective ],
  templateUrl: './autocomplete-control.html',
  styleUrl: './autocomplete-control.scss',
})
export class AutocompleteControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: IAutocompleteControl;
  protected options: any[] = [];
  protected filteredOptions: any[] = [];
  private query!: string;

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
  ) {
    super(controlContainer, formService);
  }

  load(control: IControl): void {
      this.add(control);
      this.options = this.control.options || [];
  }

  protected filter(event: AutoCompleteCompleteEvent) {
      let filtered: any[] = [];
      this.query = event.query;
      
      for (let i = 0; i < this.options.length; i++) {
        let option = this.options[i];
        if (option[this.control.option_label || 'name'].toLowerCase().indexOf(this.query.toLowerCase()) >= 0) {
          filtered.push(option);
        }
      }
      
      this.filteredOptions = filtered;
  }

  protected addOption() {
    const keyName = this.control.option_label || 'name';
    const keyValue = this.control.option_value || 'id';
    const newOption = {
      [keyName]: this.query,
      [keyValue]: this.options[this.options.length - 1][keyValue] + 1
    }
    this.options.push(newOption);
    this.formContext.patchValue(newOption, { emitEvent: false })
  }

}
