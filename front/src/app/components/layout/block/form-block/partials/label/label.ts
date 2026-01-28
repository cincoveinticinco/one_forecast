import { Component, Input } from '@angular/core';
import { ILabel } from './label.interface';
import { SafeHtmlPipe } from 'primeng/menu';
import { LabelBehaviorDirective } from "../../../../../../directives/label-behavior.directive";

@Component({
  selector: 'app-label',
  imports: [SafeHtmlPipe],
  templateUrl: './label.html',
  styleUrl: './label.scss',
})
export class Label {

  @Input() control!: ILabel;

}
