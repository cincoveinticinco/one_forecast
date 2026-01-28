import { Component, Input } from '@angular/core';
import { DocConfig } from '../../interfaces/doc-config.interface';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-doc-information',
  imports: [TableModule, BadgeModule],
  templateUrl: './doc-information.html',
  styleUrl: './doc-information.scss',
})
export class DocInformation {

  @Input() config!: DocConfig[];

}
