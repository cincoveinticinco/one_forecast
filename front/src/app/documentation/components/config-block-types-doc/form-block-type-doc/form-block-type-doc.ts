import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocConfig } from '../../../../interfaces/doc-config.interface';
import { DocInformation } from '../../../../shared/doc-information/doc-information';
import FormBlockTypeDocConfig from './form-block-type-doc.config.json'
import ControlDocConfig from './control-doc.config.json'


@Component({
  selector: 'app-form-block-type-doc',
  imports: [RouterOutlet, DocInformation],
  templateUrl: './form-block-type-doc.html',
  styleUrl: './form-block-type-doc.scss',
})
export class FormBlockTypeDoc {

  config: DocConfig[] = FormBlockTypeDocConfig;
  controlconfig: DocConfig[] = ControlDocConfig;

}
