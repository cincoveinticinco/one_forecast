import { Component } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ControlBlockComponentBase } from '../../../../lib/control-block-component.base';
import { IControlComponent } from '../../../../interfaces/control-component.interface';
import { IFileControl } from './file-control.interface';
import { ControlContainer, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../../../services/form/form.service';
import { IControl } from '../../../../interfaces/control.interface';
import { Label } from '../../partials/label/label';
import { LabelBehaviorDirective } from '../../../../../../directives/label-behavior.directive';
import { ErrorControl } from '../../partials/error-control/error-control';

@Component({
  selector: 'app-file-control',
  imports: [ ReactiveFormsModule, Label, LabelBehaviorDirective, ErrorControl, FileUpload, ToastModule, ButtonModule],
  templateUrl: './file-control.html',
  styleUrl: './file-control.scss',
  providers: [MessageService] 
})
export class FileControl extends ControlBlockComponentBase implements IControlComponent {

  declare control: IFileControl;
  protected uploadedFiles: any[] = [];

  constructor(
    protected override controlContainer: ControlContainer,
    protected override formService: FormService,
    private messageService: MessageService
  ) {
    super(controlContainer, formService);
  }

  load(control: IControl): void {
    this.add(control);
  }

  protected onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    if (this.uploadedFiles.length > 0) {
      this.formContext.clearValidators();
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

}
