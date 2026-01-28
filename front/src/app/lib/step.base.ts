import { ChangeDetectorRef, Component, inject, Input } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { ILayout } from "../components/layout/interfaces/layout.interface";
import { IFormSubmission, IFormSubmissionFieldResponse, IFormSubmissionResponse } from "../components/layout/interfaces/form-submission.interface";
import { FormSubmissionService } from "../components/layout/services/form-submission/form-submission.service";
import { IFieldLayoutBack } from "../interfaces/field-layout-back.interface";
import { FormSubmissionValuesService } from "../components/layout/services/form-submission-values/form-submission-values.service";
import { LayoutCoreService } from "../components/layout/services/layout-core/layout-core.service";
import { FormTemplateService } from "../components/layout/services/form-template/form-template.service";
import { transformSubmission } from "../helpers/submission/transform-submission";
import { DynamicDialog } from "./dynamic-dialog.base";

@Component({template: ''})
export abstract class StepBase extends DynamicDialog {

    @Input() protected formTemplateSlug!: string;
    @Input() protected tenantSlug!: string;
    @Input() protected layout: ILayout = {};
    protected form!: FormGroup;
    protected cdr = inject(ChangeDetectorRef);
    protected tempLayout: IFieldLayoutBack[] = [];
    protected loading = true;
    protected formSubmissionId!: number;
    private formSubmissionService = inject(FormSubmissionService);
    private formSubmissionValuesService = inject(FormSubmissionValuesService);
    private layoutCoreService = inject(LayoutCoreService);
    private formTemplateService = inject(FormTemplateService);

    protected transformSubmission(): IFormSubmission {
        return transformSubmission(this.form.getRawValue(), this.layout);
    }

    protected async findTemplate(): Promise<void> {
        this.tempLayout = await this.formTemplateService.find(this.formTemplateSlug, this.tenantSlug)
    }

    protected async startLayout(): Promise<void> {
        this.form = this.layoutCoreService.getForm();
    }

    protected async createFormSubmission(form_submission: IFormSubmission) {
        try {
            const { id } = await this.formSubmissionService.create(form_submission, this.tenantSlug, this.formTemplateSlug!);
            this.formSubmissionId = id;
        } catch (error) {
            throw error;
        }
    }

    protected async sendSubmission() {
        try {
            await this.formSubmissionService.submit(this.tenantSlug, this.formTemplateSlug, this.formSubmissionId);
            this.openToast('success', 'Form Submission sent');
        } catch (error) {
            throw error;
        }
    } 

    protected async updateFormSubmission(form_submission: IFormSubmission, form_submission_id: number) {
        try {
            await this.formSubmissionService.update(form_submission, this.tenantSlug, this.formTemplateSlug!, form_submission_id);
        } catch (error) {
            throw error;
        }
    }

    protected async getSubmissions(): Promise<IFormSubmissionResponse[]> {
        return await this.formSubmissionService.findByTemplate(this.formTemplateSlug!, this.tenantSlug);
    }

    protected getSubmissionResponse = async(): Promise<IFormSubmissionFieldResponse[]> => {
        if (!this.formSubmissionId) return [];
        return await this.formSubmissionValuesService.findById(this.formTemplateSlug!, this.tenantSlug, this.formSubmissionId!);
    }

    protected autosave = async (field: {field_key: string, value: string}, data: any[]) => {
        if (!field.value) return;
        if (!this.formSubmissionId) {
            const child = [...this.layout.blocks!.filter(block => block.field_type === 'section').flatMap(section => section.children ?? [])].find(child => child.config.key === field.field_key);
            return await this.createFormSubmission({form_submission: {form_submission_values_attributes: [{form_field_id: child?.config.id, value: field.value}]}});
        } else {
            return this.formSubmissionService.autosave(this.formSubmissionId, field)
        }
    }

}