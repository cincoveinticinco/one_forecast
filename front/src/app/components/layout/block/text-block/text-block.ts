import { Component, OnInit } from '@angular/core';
import { BlockComponentBase } from '../../lib/block-component.base';
import { IBlockComponent } from '../../interfaces/block-component.interface';
import { ITextBlock } from './text-block.interface';
import { IBlock } from '../../interfaces/block.interface';
import { SafeHtmlPipe } from 'primeng/menu';

@Component({
  selector: 'app-text-block',
  imports: [SafeHtmlPipe],
  templateUrl: './text-block.html',
  styleUrl: './text-block.scss',
})
export class TextBlock extends BlockComponentBase<ITextBlock> implements OnInit, IBlockComponent {

  constructor() {
    super();
  }

  ngOnInit(): void {    
  }

  load(block: IBlock): void {
      this.add(block);
  }

}
