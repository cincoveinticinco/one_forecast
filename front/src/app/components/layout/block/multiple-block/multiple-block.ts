import { Component, OnInit } from '@angular/core';
import { BlockComponentBase } from '../../lib/block-component.base';
import { IFormBlock } from '../form-block/form-block.interface';
import { IBlockComponent } from '../../interfaces/block-component.interface';
import { IBlock } from '../../interfaces/block.interface';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Block } from '../../lib/block/block';
import { Button } from 'primeng/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-multiple-block',
  imports: [ReactiveFormsModule, Block, Button, NgClass],
  templateUrl: './multiple-block.html',
  styleUrl: './multiple-block.scss',
})
export class MultipleBlock extends BlockComponentBase<IFormBlock> implements OnInit, IBlockComponent {
  
  ready = false;
  // declare parentForm: FormArray;

  constructor(
    // private layoutService: LayoutService
  ){
    super();
  }

  ngOnInit(): void {
      
  }

  load(block: IBlock): void {
    this.add(block);
    this.parentForm = this.controlContainer.control as FormGroup;
    this.addChildForm('array');
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