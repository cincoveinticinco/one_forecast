import { Component, inject, ViewChild } from "@angular/core";
import { LayoutComponent } from "../components/layout/lib/layout/layout";
import { StepBase } from "./step.base";
import { transformLayout } from "../helpers/layout/tranform-layout";
import { IFormSubmission } from "../components/layout/interfaces/form-submission.interface";

@Component({template: ''})
export abstract class DynamicStepBase extends StepBase {

    @ViewChild('layoutRef') layoutRef!: LayoutComponent;

    constructor(
    ) {
        super();
    }

    protected async initLayout() {
        this.loading = false;
        this.cdr.detectChanges();
        await this.startLayout();
    }

    protected async initLayoutSubmission() {
        await this.getFormSubmission();
        await this.setFormSubmissionResponse();
        this.layout = transformLayout(this.tempLayout, [this.autosave, this.getSubmissionResponse]);
        this.loading = false;
        this.cdr.detectChanges();
        await this.startLayout();
    }

    protected async getFormSubmission() {
        const submissions = await this.getSubmissions();
        // const fields = [...this.tempLayout.filter(temp => temp.field_type === 'section').flatMap(section => section.children ?? [])];
        for (const submission of submissions) {
            if (submission.status === 'draft') {
                this.formSubmissionId = submission.id!;
                return;
            }
        }
    }

    protected async setFormSubmissionResponse() {
        if (!this.formSubmissionId) return;
        const response = await this.getSubmissionResponse();
        const fields = [...this.tempLayout.filter(temp => temp.field_type === 'section').flatMap(section => section.children ?? [])];
        for (const res of response) {
            const field = fields.find(f => f.id === res.form_field_id);
            if (!field) continue;
            field.response = res.response;
            field.id_back = res.id;
        }
    }

    // protected async sendSubmission() {
    //     const data: IFormSubmission = this.transformSubmission();

    //     if (this.formSubmissionId) {
    //         await this.updateFormSubmission(data, this.formSubmissionId);
    //     } else {
    //         await this.createFormSubmission(data);
    //     }

    // } 
}