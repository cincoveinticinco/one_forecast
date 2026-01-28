import { Component, OnInit } from '@angular/core';
import { BlockComponentBase } from '../../lib/block-component.base';
import { IBlockComponent } from '../../interfaces/block-component.interface';
import { IBlock } from '../../interfaces/block.interface';
import { ITitleBlock } from './title.interface';
import { SafeHtmlPipe } from 'primeng/menu';

@Component({
  selector: 'app-title-block',
  imports: [SafeHtmlPipe],
  templateUrl: './title-block.html',
  styleUrl: './title-block.scss',
})
export class TitleBlock extends BlockComponentBase<ITitleBlock> implements OnInit, IBlockComponent {

  constructor() {
    super();
  }

  ngOnInit(): void {
      
  }

  load(block: IBlock): void {
      this.add(block);
  }

}
