import { ILayout } from "../../../components/layout/interfaces/layout.interface";

export const TEMPLATE_FORM_LAYOUT: ILayout = {
    title: '',
    blocks: [
        {
            field_type: 'section',
            config: {
                key: 'form_template',
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
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        help_text: 'test',
                        key: 'slug',
                        label: 'Slug',
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
                        key: 'template_type',
                        label: 'Template type',
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
                        help_text: 'test',
                        key: 'access_type',
                        label: 'Access type',
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