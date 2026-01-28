import { ILayout } from "../../../components/layout/interfaces/layout.interface";

export const WORKFLOW_STEPS_FORM_LAYOUT: ILayout = {
    title: '',
    blocks: [
        {
            field_type: 'section',
            config: {
                key: 'workflow_step',
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
                        disabled: false,
                        key: 'step_type',
                        label: 'Step type',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        options: [
                            {
                                value: 'approval',
                                label: 'Approval',
                            },
                            {
                                value: 'form',
                                label: 'Form',
                            },
                            {
                                value: 'file_upload',
                                label: 'File upload',
                            },
                        ],
                    },
                },
                {
                    field_type: 'number',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        key: 'order',
                        label: 'Order',
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
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        key: 'color',
                        label: 'Color',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    },
                },
                {
                    field_type: 'number',
                    config: {
                        classes: 'md:col-12 sm:col-12',
                        disabled: true,
                        key: 'form_template_id',
                        label: 'Form template',
                        type: 'text',
                        value: null,
                        hidden: true,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        effects: [
                            {
                                effect_type: 'hidden',
                                key_control: 'form_template_id',
                                target_path: 'workflow_step.step_type',
                                value_path: ['form']
                            }
                        ],
                    },
                },
                {
                    field_type: 'toggle',
                    config: {
                        classes: 'md:col-4 sm:col-12',
                        disabled: true,
                        key: 'approve',
                        label: 'Approve',
                        value: null,
                        hidden: true,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        effects: [
                            {
                                effect_type: 'hidden',
                                key_control: 'approve',
                                target_path: 'workflow_step.step_type',
                                value_path: ['approval']
                            }
                        ],
                    },
                },
                {
                    field_type: 'toggle',
                    config: {
                        classes: 'md:col-4 sm:col-12',
                        disabled: true,
                        key: 'reject',
                        label: 'Reject',
                        value: null,
                        hidden: true,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        effects: [
                            {
                                effect_type: 'hidden',
                                key_control: 'reject',
                                target_path: 'workflow_step.step_type',
                                value_path: ['approval']
                            }
                        ],
                    },
                },
                {
                    field_type: 'toggle',
                    config: {
                        classes: 'md:col-4 sm:col-12',
                        disabled: true,
                        key: 'return',
                        label: 'Return',
                        value: null,
                        hidden: true,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        effects: [
                            {
                                effect_type: 'hidden',
                                key_control: 'return',
                                target_path: 'workflow_step.step_type',
                                value_path: ['approval']
                            }
                        ],
                    },
                },
                {
                    field_type: 'select',
                    config: {
                        classes: 'md:col-12 sm:col-12',
                        disabled: true,
                        key: 'allowed_types',
                        label: 'Allowed types',
                        value: null,
                        hidden: true,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        effects: [
                            {
                                effect_type: 'hidden',
                                key_control: 'allowed_types',
                                target_path: 'workflow_step.step_type',
                                value_path: ['file_upload']
                            }
                        ],
                        multiple: true,
                        options: [
                            {
                                value: '.pdf',
                                label: 'PDF',
                            },
                            {
                                value: '.jpg',
                                label: 'JPG',
                            },
                            {
                                value: '.png',
                                label: 'PNG',
                            },
                        ],
                    },
                },
                {
                    field_type: 'number',
                    config: {
                        classes: 'md:col-12 sm:col-12',
                        disabled: true,
                        key: 'min_files',
                        label: 'Minimum files',
                        value: null,
                        hidden: true,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        effects: [
                            {
                                effect_type: 'hidden',
                                key_control: 'min_files',
                                target_path: 'workflow_step.step_type',
                                value_path: ['file_upload']
                            }
                        ],
                    },
                },
                {
                    field_type: 'number',
                    config: {
                        classes: 'md:col-12 sm:col-12',
                        disabled: true,
                        key: 'max_files',
                        label: 'Maximum files',
                        value: null,
                        hidden: true,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        effects: [
                            {
                                effect_type: 'hidden',
                                key_control: 'max_files',
                                target_path: 'workflow_step.step_type',
                                value_path: ['file_upload']
                            }
                        ],
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