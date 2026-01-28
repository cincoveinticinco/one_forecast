import { Component, OnInit } from '@angular/core';
import { BlockComponentBase } from '../../lib/block-component.base';
import { IBlockComponent } from '../../interfaces/block-component.interface';
import { IBlock } from '../../interfaces/block.interface';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IActionBlock } from './action-block.interface';
import { JsonPipe, NgClass } from '@angular/common';
import { Button } from 'primeng/button';
import { Block } from '../../lib/block/block';
import { ControlBlock } from '../form-block/control/control-block/control-block';

@Component({
  selector: 'app-action-block',
  imports: [ReactiveFormsModule, Block, NgClass, ControlBlock],
  templateUrl: './action-block.html',
  styleUrl: './action-block.scss',
})
export class ActionBlock extends BlockComponentBase<IActionBlock> implements OnInit, IBlockComponent {
  
  ready = false;

  constructor(){
    super();
  }

  ngOnInit(): void {}

  load(block: IBlock): void {
    this.add(block);
    this.parentForm = this.controlContainer.control as FormGroup;
    this.ready = false;
    this.loadForm();
  }

  protected addBlock() {
    if (!this.block.children) return;
    const lastBlock = this.block.children[this.block.children.length - 1];
    this.block.children.push({...lastBlock, config: { ...lastBlock.config, id: lastBlock.config.id! + 1 }});
  }

  protected deleteBlock(id: number ) {
    if (!this.block.children) return;
    const children = this.block.children;
    const blockIndex = children.findIndex(b => b.config.id === id);
    children.splice(blockIndex, 1);
    const array = this.form as unknown as FormArray;
    array.removeAt(blockIndex);
  }

  private async loadForm(): Promise<void> {
    try {
      this.ready = true;
    } catch (error) {
      console.warn(error)
    }
  }
}
