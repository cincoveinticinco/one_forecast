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
                        classes: 'md:col-1 sm:col-12',
                        disabled: true,
                        key: 'approve',
                        label: 'Approve',
                        value: null,
                        hidden: true,
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
                        classes: 'md:col-1 sm:col-12',
                        disabled: true,
                        key: 'reject',
                        label: 'Reject',
                        value: null,
                        hidden: true,
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
                        classes: 'md:col-1 sm:col-12',
                        disabled: true,
                        key: 'return',
                        label: 'Return',
                        value: null,
                        hidden: true,
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
        {
            field_type: 'section',
            config: {
                key: 'actions',
                classes: '',
                label: 'Actions',
            },
            children: [
                {
                    field_type: 'section',
                    config: {
                        key: 'on_enter',
                        classes: '',
                        label: '',
                    },
                    children: [
                        {
                            field_type: 'toggle',
                            config: {
                                classes: 'md:col-12 sm:col-12 py-0',
                                disabled: false,
                                key: 'action',
                                label: 'On enter',
                                value: null,
                                hidden: false,
                            },
                        },
                        {
                            field_type: 'action',
                            config: {
                                classes: 'md:col-12 sm:col-12',
                                key: 'on_enter_action',
                                hidden: true,
                                disabled: true,
                                label: 'Actions list',
                                value: null,
                                validators: [
                                    {
                                        validator_type: 'required',
                                    }
                                ],
                                options: [
                                    {
                                        label: 'Email',
                                        value: 'email'
                                    }
                                ],
                                effects: [
                                    {
                                        effect_type: 'hidden',
                                        key_control: 'on_enter_action',
                                        target_path: 'actions.on_enter.action',
                                        value_path: [true]
                                    }
                                ],
                                children: [
                                    {
                                        field_type: 'array',
                                        config: {
                                            key: 'actions',
                                            disabled: false,
                                            blocks: [
                                            ],
                                            has_initial: true,
                                            add_config: {
                                                show_add: false,
                                                show_index: true,
                                                can_remove_first: true
                                            } 
                                        }
                                    },
                                ]
                            }
                        },
                    ]
                },
                {
                    field_type: 'section',
                    config: {
                        key: 'on_exit',
                        classes: '',
                        label: '',
                    },
                    children: [
                        {
                            field_type: 'toggle',
                            config: {
                                classes: 'md:col-12 sm:col-12 py-0',
                                disabled: false,
                                key: 'action',
                                label: 'On exit',
                                value: null,
                                hidden: false,
                            },
                        },
                        {
                            field_type: 'action',
                            config: {
                                classes: 'md:col-12 sm:col-12',
                                key: 'on_exit_action',
                                hidden: true,
                                disabled: true,
                                label: 'Actions list',
                                value: null,
                                validators: [
                                    {
                                        validator_type: 'required',
                                    }
                                ],
                                options: [
                                    {
                                        label: 'Email',
                                        value: 'email'
                                    }
                                ],
                                effects: [
                                    {
                                        effect_type: 'hidden',
                                        key_control: 'on_exit_action',
                                        target_path: 'actions.on_exit.action',
                                        value_path: [true]
                                    }
                                ],
                                children: [
                                    {
                                        field_type: 'array',
                                        config: {
                                            key: 'actions',
                                            disabled: false,
                                            blocks: [
                                            ],
                                            has_initial: true,
                                            add_config: {
                                                show_add: false,
                                                show_index: true,
                                                can_remove_first: true
                                            } 
                                        }
                                    },
                                ]
                            }
                        },
                    ]
                },
                {
                    field_type: 'section',
                    config: {
                        key: 'on_approve',
                        classes: '',
                        label: '',
                    },
                    children: [
                        {
                            field_type: 'toggle',
                            config: {
                                classes: 'md:col-12 sm:col-12 py-0',
                                disabled: false,
                                key: 'action',
                                label: 'On approve',
                                value: null,
                                hidden: false,
                            },
                        },
                        {
                            field_type: 'action',
                            config: {
                                classes: 'md:col-12 sm:col-12',
                                key: 'on_approve_action',
                                hidden: true,
                                disabled: true,
                                label: 'Actions list',
                                value: null,
                                validators: [
                                    {
                                        validator_type: 'required',
                                    }
                                ],
                                options: [
                                    {
                                        label: 'Email',
                                        value: 'email'
                                    }
                                ],
                                effects: [
                                    {
                                        effect_type: 'hidden',
                                        key_control: 'on_approve_action',
                                        target_path: 'actions.on_approve.action',
                                        value_path: [true]
                                    }
                                ],
                                children: [
                                    {
                                        field_type: 'array',
                                        config: {
                                            key: 'actions',
                                            disabled: false,
                                            blocks: [
                                            ],
                                            has_initial: true,
                                            add_config: {
                                                show_add: false,
                                                show_index: true,
                                                can_remove_first: true
                                            } 
                                        }
                                    },
                                ]
                            }
                        },
                    ]
                },
                {
                    field_type: 'section',
                    config: {
                        key: 'on_reject',
                        classes: '',
                        label: '',
                    },
                    children: [
                        {
                            field_type: 'toggle',
                            config: {
                                classes: 'md:col-12 sm:col-12 py-0',
                                disabled: false,
                                key: 'action',
                                label: 'On reject',
                                value: null,
                                hidden: false,
                            },
                        },
                        {
                            field_type: 'action',
                            config: {
                                classes: 'md:col-12 sm:col-12',
                                key: 'on_reject_action',
                                hidden: true,
                                disabled: true,
                                label: 'Actions list',
                                value: null,
                                validators: [
                                    {
                                        validator_type: 'required',
                                    }
                                ],
                                options: [
                                    {
                                        label: 'Email',
                                        value: 'email'
                                    }
                                ],
                                effects: [
                                    {
                                        effect_type: 'hidden',
                                        key_control: 'on_reject_action',
                                        target_path: 'actions.on_reject.action',
                                        value_path: [true]
                                    }
                                ],
                                children: [
                                    {
                                        field_type: 'array',
                                        config: {
                                            key: 'actions',
                                            disabled: false,
                                            blocks: [
                                            ],
                                            has_initial: true,
                                            add_config: {
                                                show_add: false,
                                                show_index: true,
                                                can_remove_first: true
                                            } 
                                        }
                                    },
                                ]
                            }
                        },
                    ]
                },
                {
                    field_type: 'section',
                    config: {
                        key: 'on_return',
                        classes: '',
                        label: '',
                    },
                    children: [
                        {
                            field_type: 'toggle',
                            config: {
                                classes: 'md:col-12 sm:col-12 py-0',
                                disabled: false,
                                key: 'action',
                                label: 'On return',
                                value: null,
                                hidden: false,
                            },
                        },
                        {
                            field_type: 'action',
                            config: {
                                classes: 'md:col-12 sm:col-12',
                                key: 'on_return_action',
                                hidden: true,
                                disabled: true,
                                label: 'Actions list',
                                value: null,
                                validators: [
                                    {
                                        validator_type: 'required',
                                    }
                                ],
                                options: [
                                    {
                                        label: 'Email',
                                        value: 'email'
                                    }
                                ],
                                effects: [
                                    {
                                        effect_type: 'hidden',
                                        key_control: 'on_return_action',
                                        target_path: 'actions.on_return.action',
                                        value_path: [true]
                                    }
                                ],
                                children: [
                                    {
                                        field_type: 'array',
                                        config: {
                                            key: 'actions',
                                            disabled: false,
                                            blocks: [
                                            ],
                                            has_initial: true,
                                            add_config: {
                                                show_add: false,
                                                show_index: true,
                                                can_remove_first: true
                                            } 
                                        }
                                    },
                                ]
                            }
                        },
                    ]
                },
            ]
        }
    ],
    action_config: {
        show_cancel: false,
        show_back: false,
        show_next: true,
        next_text: 'Save'
    }
}