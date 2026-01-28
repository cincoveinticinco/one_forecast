import { ILayout } from "../../../components/layout/interfaces/layout.interface";

export const WORKFLOW_FORM_LAYOUT: ILayout = {
    title: '',
    blocks: [
        {
            field_type: 'section',
            config: {
                key: 'workflow',
                classes: '',
                label: '',
            },
            children: [
                {
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        key: 'name',
                        label: 'Name',
                        type: 'text',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    },
                },
                {
                    field_type: 'select',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: true,
                        key: 'workflow_type',
                        label: 'Workflow type',
                        value: 'form_submission',
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        options: [
                            {
                                value: 'form_submission',
                                label: 'Form submission',
                            }
                        ],
                    },
                },
                {
                    field_type: 'select',
                    config: {
                        classes: 'md:col-12 sm:col-12',
                        disabled: false,
                        key: 'status',
                        label: 'Status',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        options: [
                            {
                                value: 'active',
                                label: 'Active',
                            },
                            {
                                value: 'inactive',
                                label: 'Inactive',
                            }
                        ],
                    },
                },
                {
                    field_type: 'text',
                    config: {
                        key: 'tenant_id',
                        hidden: true
                    },
                },
            ]
        },
    ],
    action_config: {
        show_cancel: false,
        show_back: false,
        show_next: true,
        next_text: 'Save'
    }
}