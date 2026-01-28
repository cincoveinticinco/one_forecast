import { NgClass } from '@angular/common';
import { AfterContentChecked, AfterViewInit, Component, inject, AfterViewChecked, DestroyRef, AfterContentInit, effect, OnInit, ChangeDetectorRef } from '@angular/core';
import { LayoutCoreService } from '../../components/layout/services/layout-core/layout-core.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface ISection {id: string, group: FormGroup, status?: string}

@Component({
  selector: 'app-menu-progress',
  imports: [ NgClass ],
  templateUrl: './menu-progress.html',
  styleUrl: './menu-progress.scss',
})
export class MenuProgress implements AfterContentChecked, OnInit {

  private layoutCore = inject(LayoutCoreService);
  private form!: FormGroup;
  private route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  protected sections: ISection[] = [];
  protected activeSectionId: any;

  constructor() {
    effect(() => {
      if ( !this.layoutCore.formFocusedId() ) return;
      this.activeSectionId = this.layoutCore.formFocusedId()!;
    })
  }

  ngOnInit(): void {
    this.route.fragment
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        if (!this.sections.some(section => section.id === value)) return;
        this.activate(this.sections.find(section => section.id === value)!);
      })
  }

  ngAfterContentChecked(): void {
    this.form = this.layoutCore.getForm();
    for (const [key, form] of Object.entries(this.form.controls)) {
      if (this.sections.some(s => s.id === key)) continue;
      this.sections.push({ id: key, group: form as FormGroup});
    }
    this.activeSectionId = this.activeSectionId || this.sections[0]?.id; 

    this.updateStatus();
  }

  updateStatus() {
    for (const section of this.sections) {
      const group = section.group;

      if (group.valid) {
        section.status = 'valid';
        continue;
      }

      if (section.id === this.activeSectionId) {
        section.status = 'active';
        continue;
      }

      if (!group.touched) {
        section.status = 'empty';
      } else if (group.invalid) {
        section.status = 'error';
      }
    }
    this.cdr.detectChanges();
  }

  activate(section: ISection) {
    this.activeSectionId = section.id;
    this.updateStatus();

    document
      .getElementById(section.id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
