import { Component } from '@angular/core';
import { DocInformation } from '../../../shared/doc-information/doc-information';
import BlockDocConfig from './block-doc.config.json'

@Component({
  selector: 'app-block-doc',
  imports: [DocInformation],
  templateUrl: './block-doc.html',
  styleUrl: './block-doc.scss',
})
export class BlockDoc {

  protected config: any = BlockDocConfig;

}
