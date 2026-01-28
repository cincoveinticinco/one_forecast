import { Component, OnInit } from '@angular/core';
import { BlockComponentBase } from '../../lib/block-component.base';
import { IBlockComponent } from '../../interfaces/block-component.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IBlock } from '../../interfaces/block.interface';
import { ControlBlock } from '../form-block/control/control-block/control-block';
import { IFormControlBlock } from './form-control-block.interface';

@Component({
  selector: 'app-form-control-block',
  imports: [ReactiveFormsModule, ControlBlock],
  templateUrl: './form-control-block.html',
  styleUrl: './form-control-block.scss',
})
export class FormControlBlock extends BlockComponentBase<IFormControlBlock> implements OnInit, IBlockComponent {

  constructor() {
    super();
  }

  ngOnInit(): void {    
  }
  
  load(block: IBlock): void {
    this.form = this.controlContainer.control as FormGroup;
    this.add(block);
  }

}
