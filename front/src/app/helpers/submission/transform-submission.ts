import { IFormSubmission, IFormSubmissionField } from "../../components/layout/interfaces/form-submission.interface";
import { ILayout } from "../../components/layout/interfaces/layout.interface";


export const transformSubmission: ( parentForm: Record<string, any>, layout: ILayout ) => IFormSubmission = (parentForm, layout) => {
    const fields: IFormSubmissionField[] = [];
    for (const [key, form] of Object.entries(parentForm)) {
        const section = layout.blocks?.find(block => block.config.key === key);
        if (!form) continue;
        for (const [keyfield, field] of Object.entries(form)) {
            fields.push({
                id: section?.children?.find(child => child.config.key === keyfield)?.config.id_back,
                form_field_id: section?.children?.find(child => child.config.key === keyfield)?.config.id,
                value: field
            })
        }
    }
    return {
        form_submission: {
            form_submission_values_attributes: fields,
        }
    }
}