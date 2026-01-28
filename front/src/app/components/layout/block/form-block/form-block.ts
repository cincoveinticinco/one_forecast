import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBlock } from '../../interfaces/block.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFormBlock } from './form-block.interface';
import { IBlockComponent } from '../../interfaces/block-component.interface';
import { BlockComponentBase } from '../../lib/block-component.base';
import { ControlBlock } from './control/control-block/control-block';
import { Block } from '../../lib/block/block';
import { SafeHtmlPipe } from 'primeng/menu';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-form-block',
  imports: [ReactiveFormsModule, Block, SafeHtmlPipe, NgClass],
  templateUrl: './form-block.html',
  styleUrl: './form-block.scss',
})
export class FormBlock extends BlockComponentBase<IFormBlock> implements OnInit, IBlockComponent {

  @ViewChild('formBlock') formBlock!: ElementRef;

  ready = false;

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
    this.addChildForm('group');
    this.ready = false;
    this.loadForm();
  }

  private async loadForm(): Promise<void> {
    try {
      this.ready = true;
    } catch (error) {
      console.warn(error)
    }
  }

  onFocusIn() {
    if (!this.formBlock) return;
    this.layoutCore.setFormFocusedId(this.formBlock.nativeElement.id);
  }

}
