import { AfterViewInit, Component, DestroyRef, inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { TieredMenu } from 'primeng/tieredmenu';
import { TableBase } from '../table.base';
import { Filter } from '../filter/filter';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Cell } from '../cell/cell';

@Component({
  selector: 'app-table',
  imports: [TableModule, Button, TieredMenu, Filter, ReactiveFormsModule, IconFieldModule, InputIconModule, Cell],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table extends TableBase implements OnInit, AfterViewInit, OnChanges {

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filtersOptions']) {
      this.setFiltersOptions();
    }
  }

  ngOnInit(): void {
    this.tableCoreService.initFilters();
    this.filterForm = this.tableCoreService.getFilterForm();
    if (this.hasFilters() || this.filtersOptions['filter_keys']) {
      this.setFiltersOptions();
    }
    this.setSort();
  }

  ngAfterViewInit(): void {
    this.filterForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      this.triggerFilters.emit(result);
    });
  }


}
