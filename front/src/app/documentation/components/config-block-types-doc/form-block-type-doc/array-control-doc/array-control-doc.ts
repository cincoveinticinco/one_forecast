import { Component } from '@angular/core';
import { DocInformation } from '../../../../../shared/doc-information/doc-information';
import { DocConfig } from '../../../../../interfaces/doc-config.interface';
import ArrayControlDocConfig from './array-control-doc.config.json';
import AddConfigDocConfig from './add-config-doc.config.json';

@Component({
  selector: 'app-array-control-doc',
  imports: [DocInformation],
  templateUrl: './array-control-doc.html',
  styleUrl: './array-control-doc.scss',
})
export class ArrayControlDoc {

  config: DocConfig[] = ArrayControlDocConfig;
  addconfig: DocConfig[] = AddConfigDocConfig;

}
