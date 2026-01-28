import { Component } from '@angular/core';
import { DocInformation } from '../../../../../shared/doc-information/doc-information';
import { DocConfig } from '../../../../../interfaces/doc-config.interface';
import InputControlDocConfig from './input-control-doc.config.json';

@Component({
  selector: 'app-input-control-doc',
  imports: [DocInformation],
  templateUrl: './input-control-doc.html',
  styleUrl: './input-control-doc.scss',
})
export class InputControlDoc {

  config: DocConfig[] = InputControlDocConfig;

}
