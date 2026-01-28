import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableCoreService {
  
  private filterForm!: FormGroup;
  
  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
  ) {
  }
  
  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  initFilters(): void {
    this.filterForm = this.fb.group({});
  }

  getFilterForm(): FormGroup {
    return this.filterForm;
  }

}
