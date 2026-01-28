import { Component } from '@angular/core';
import { DocInformation } from '../../../shared/doc-information/doc-information';
import { DocConfig } from '../../../interfaces/doc-config.interface';
import LayoutDocConfig from './layout-doc.config.json';


@Component({
  selector: 'app-layout-doc',
  imports: [DocInformation],
  templateUrl: './layout-doc.html',
  styleUrl: './layout-doc.scss',
})
export class LayoutDoc {

  config: DocConfig[] = LayoutDocConfig;

}
