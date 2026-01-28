import { Component } from '@angular/core';
import { DocInformation } from '../../../../../shared/doc-information/doc-information';
import { DocConfig } from '../../../../../interfaces/doc-config.interface';
import FormControlDocConfig from './form-control-doc.config.json';

@Component({
  selector: 'app-form-control-doc',
  imports: [DocInformation],
  templateUrl: './form-control-doc.html',
  styleUrl: './form-control-doc.scss',
})
export class FormControlDoc {
  config: DocConfig[] = FormControlDocConfig;
}
