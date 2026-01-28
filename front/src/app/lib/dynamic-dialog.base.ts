import { Component, inject } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IDialog } from "../interfaces/dialog.interface";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IConfirmDialog } from "../interfaces/confirmdialog.interface";


@Component({template: ``})
export abstract class DynamicDialog {

    private ref: DynamicDialogRef | undefined;
    private _dialog!: IDialog;
    private _confirmationDialog!: IConfirmDialog;
    private dialogService = inject(DialogService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    constructor() {}

    protected openToast(severity: 'info' | 'success' | 'warn' | 'error' | 'secondary', summary: string, detail: string = '', life: number = 2000) {
        this.messageService.add({ severity, summary, detail, life });
    }

    protected openContentDialog() {
        if (!this._dialog) throw new Error('Dynamic dialog must be set before call openContentDialog')
        this.closeDialog();
        this.ref = this.dialogService.open(this.dialog.component, {
            header: this.dialog.header,
            width: this.dialog.width ?? '50vw',
            modal: this.dialog.modal ?? true,
            breakpoints: this.dialog.breakpoints ?? {
                '960px': '75vw',
                '640px': '90vw'
            },
            maximizable: this.dialog.maximizable ?? false,
            data: this.dialog.data ?? {},
            inputValues: this.dialog.input_values ?? {},
            focusOnShow: false,     
            closable: true       
        });

        // this.ref.onClose.subscribe(() => {
            // do something when it close
            // this.messageService.add({ severity: 'info', summary: 'title', detail: 'text' });
        // });
    }

    protected openConfirmationDialog() {
        if (!this._confirmationDialog) throw new Error('Confirmation dialog must be set before call openConfirmationDialog');
        this.confirmationService?.close();
        this.confirmationService.confirm({
            message: this.confirmationDialog.message ?? '',
            header: this.confirmationDialog.header,
            closable: this.confirmationDialog.closable ?? true,
            closeOnEscape: this.confirmationDialog.closeOnEscape ?? true,
            icon: this.confirmationDialog.icon ?? 'pi pi-exclamation-triangle',
            rejectButtonProps: this.confirmationDialog.rejectButtonProps ?? {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: this.confirmationDialog.acceptButtonProps ?? {
                label: 'Save',
            },
            accept: () => {
                this.confirmationDialog.on_accept();
            },
            reject: () => {
                if (this.confirmationDialog.on_rejected) this.confirmationDialog.on_rejected();
            },
        });
    }

    protected closeDialog() {
        this.ref?.close();
    }

    get dialog(): IDialog {
        return this._dialog;
    }

    protected set dialog(dialog: IDialog) {
        this._dialog = dialog;
    }

    get confirmationDialog(): IConfirmDialog {
        return this._confirmationDialog;
    }

    protected set confirmationDialog(confirmation: IConfirmDialog) {
        this._confirmationDialog = confirmation;
    }

}