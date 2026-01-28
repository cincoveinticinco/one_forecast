import { Component } from '@angular/core';
import { DocInformation } from '../../../shared/doc-information/doc-information';
import { DocConfig } from '../../../interfaces/doc-config.interface';
import { TableModule } from 'primeng/table';
import ValidatorDocConfig from './validator-doc.config.json';
import ParamsDocConfig from './params-details.config.json';

@Component({
  selector: 'app-validator-doc',
  imports: [DocInformation, TableModule],
  templateUrl: './validator-doc.html',
  styleUrl: './validator-doc.scss',
})
export class ValidatorDoc {

  config: DocConfig[] = ValidatorDocConfig;
  params_details: any[] = ParamsDocConfig; 

}
