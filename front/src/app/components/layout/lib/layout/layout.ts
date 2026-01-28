import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ILayout } from '../../interfaces/layout.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { IBlock } from '../../interfaces/block.interface';
import { timer } from 'rxjs';
import { Block } from '../block/block';
import { LayoutCoreService } from '../../services/layout-core/layout-core.service';

@Component({
  selector: 'app-layout',
  imports: [ReactiveFormsModule, Block],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutComponent implements OnInit {

  load: boolean = false;
  @Input() layout!: ILayout;
  public form: FormGroup = new FormGroup({});

  constructor(
    private layoutCoreService: LayoutCoreService,
    private title: Title,
    private detectChanges: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.init();
    this.layoutCoreService.init();
    this.form = this.layoutCoreService.getForm();
    // set it through a resolver when the layout comes in an endpoint
    this.layoutCoreService.setLayout(this.layout);
    // this.layout = this.layoutCoreService.getLayout();
    this.title.setTitle(this.layout.title || 'ONEWRAPP')
  }

  trackByItems(index: number, item: IBlock): string {
    return item.key!;
  }

  public async init(): Promise<void> {
    await timer(0).toPromise();
    this.layoutCoreService.createEffect();
    this.load = true;
    this.detectChanges.detectChanges();
  }
}