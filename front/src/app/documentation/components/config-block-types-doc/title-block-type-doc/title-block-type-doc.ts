import { Component } from '@angular/core';
import { DocInformation } from '../../../../shared/doc-information/doc-information';
import { DocConfig } from '../../../../interfaces/doc-config.interface';
import TitleBlockDocConfig from './title-block-type-doc.config.json';

@Component({
  selector: 'app-title-block-type-doc',
  imports: [DocInformation],
  templateUrl: './title-block-type-doc.html',
  styleUrl: './title-block-type-doc.scss',
})
export class TitleBlockTypeDoc {

  config: DocConfig[] = TitleBlockDocConfig;

}
