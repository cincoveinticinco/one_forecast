import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms';
import { Message } from 'primeng/message';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FormErrorService } from '../../../../services/form-error/form-error.service';
import { IControl } from '../../../../interfaces/control.interface';

@Component({
  selector: 'app-error-control',
  imports: [Message],
  templateUrl: './error-control.html',
  styleUrl: './error-control.scss',
})
export class ErrorControl implements OnInit, OnDestroy {

  destroy: Subject<boolean> = new Subject<boolean>();
  @Input() control!: IControl;

  ref!: AbstractControl;
  errorMessage = '';
  private formErrorService = inject(FormErrorService);

  constructor(
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.ref = (this.controlContainer.control as FormGroup).controls[this.control.key!];
    this.validErrorMessage(this.ref.status);
    this.listeningErrors();
  }

  ngOnDestroy(): void {
      this.destroy.next(true);
      this.destroy.unsubscribe();
  }

  private listeningErrors(): void {
    this.ref.statusChanges.pipe(
      takeUntil(this.destroy),
    ).subscribe((status: string) => {
      this.validErrorMessage(status);
    });
  }

  private validErrorMessage(status: string) {
    const ERROR_KEY = Object.keys(this.ref.errors || {})[0];
    if (status === 'INVALID') {
      this.errorMessage = this.control?.validators?.find(v => v.validator_type === ERROR_KEY)?.error_message || this.formErrorService.getError(this.ref)!;
    } else {
      this.errorMessage = '';
    }
  }

}
