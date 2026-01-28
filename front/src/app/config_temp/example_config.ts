import { ILayout } from "../components/layout/interfaces/layout.interface";

export const ExampleLayout: ILayout = {
    title: 'Registro proveedores nacionales',
    blocks: [
        {
            field_type: 'text',
            config: {
                classes: 'text-md px-2 mb-5 mt-0 text-gray-600',
                label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            }
        },
        {
            field_type: 'section',
            config: {
                key: 'provider_data',
                classes: '',
                label: 'Provider data',
            },
            children: [
                {
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        help_text: 'test',
                        key: 'personal_type',
                        label: 'Provider type',
                        type: 'number',
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
                        key: 'personal_type1',
                        label: 'Provider type',
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
                        key: 'personal_type2',
                        label: 'Provider type',
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
                        key: 'personal_type3',
                        label: 'Provider type',
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
                        key: 'personal_type4',
                        label: 'Provider type',
                        type: 'text',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    },
                },
            ]
        },
        {
            field_type: 'section',
            config: {
                key: 'personal_data',
                classes: '',
                label: 'Personal data',
            },
            children: [
                {
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        help_text: 'test',
                        key: 'full_name',
                        label: 'Fullname',
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
                        key: 'full_name1',
                        label: 'Fullname',
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
                        key: 'full_name2',
                        label: 'Fullname',
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
                        key: 'full_name3',
                        label: 'Fullname',
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
                        key: 'full_name4',
                        label: 'Fullname',
                        type: 'text',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    },
                }
            ]
        },
        {
            field_type: 'section',
            config: {
                key: 'investor_data',
                classes: '',
                label: 'Investor data',
            },
            children: [
                {
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        help_text: 'test',
                        key: 'full_name',
                        label: 'Investor name',
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
                        key: 'full_name1',
                        label: 'Investor name',
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
                        key: 'full_name2',
                        label: 'Investor name',
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
                        key: 'full_name3',
                        label: 'Investor name',
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
                        key: 'full_name4',
                        label: 'Investor name',
                        type: 'text',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    },
                }
            ]
        },
        {
            field_type: 'section',
            config: {
                key: 'contact_data',
                classes: '',
                label: 'Contact data',
            },
            children: [
                {
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        help_text: 'test',
                        key: 'full_name',
                        label: 'Contact name',
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
                        key: 'full_name2',
                        label: 'Contact name',
                        type: 'text',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    },
                },{
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        help_text: 'test',
                        key: 'full_name3',
                        label: 'Contact name',
                        type: 'text',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    },
                },{
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        help_text: 'test',
                        key: 'full_name4',
                        label: 'Contact name',
                        type: 'text',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    },
                },{
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        help_text: 'test',
                        key: 'full_name5',
                        label: 'Contact name',
                        type: 'text',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    },
                }
            ]
        },
        {
            field_type: 'section',
            config: {
                key: 'economic_activity_data',
                classes: '',
                label: 'Economic activity data',
            },
            children: [
                {
                    field_type: 'selectdisabled',
                    config: {
                        key: 'main_ciiu_code',
                        classes: 'md:col-12 sm:col-12',
                        label: 'Ciiu code (main)',
                        options: [
                            {
                                id: 1,
                                name: '1',
                                description: 'Test 1'
                            },
                            {
                                id: 2,
                                name: '2',
                                description: 'Test 2'
                            },
                            {
                                id: 3,
                                name: '3',
                                description: 'Test 3'
                            },
                            {
                                id: 4,
                                name: '4',
                                description: 'Test 4'
                            },
                        ],
                        option_description: 'description' 
                    },
                },
                {
                    field_type: 'selectdisabled',
                    config: {
                        key: 'main_ciiu_code2',
                        classes: 'md:col-12 sm:col-12',
                        label: 'Ciiu code (main)',
                        options: [
                            {
                                id: 1,
                                name: '1',
                                description: 'Test 1'
                            },
                            {
                                id: 2,
                                name: '2',
                                description: 'Test 2'
                            },
                            {
                                id: 3,
                                name: '3',
                                description: 'Test 3'
                            },
                            {
                                id: 4,
                                name: '4',
                                description: 'Test 4'
                            },
                        ],
                        option_description: 'description' 
                    },
                },
                {
                    field_type: 'selectdisabled',
                    config: {
                        key: 'main_ciiu_code3',
                        classes: 'md:col-12 sm:col-12',
                        label: 'Ciiu code (main)',
                        options: [
                            {
                                id: 1,
                                name: '1',
                                description: 'Test 1'
                            },
                            {
                                id: 2,
                                name: '2',
                                description: 'Test 2'
                            },
                            {
                                id: 3,
                                name: '3',
                                description: 'Test 3'
                            },
                            {
                                id: 4,
                                name: '4',
                                description: 'Test 4'
                            },
                        ],
                        option_description: 'description' 
                    },
                },
                {
                    field_type: 'selectdisabled',
                    config: {
                        key: 'main_ciiu_code4',
                        classes: 'md:col-12 sm:col-12',
                        label: 'Ciiu code (main)',
                        options: [
                            {
                                id: 1,
                                name: '1',
                                description: 'Test 1'
                            },
                            {
                                id: 2,
                                name: '2',
                                description: 'Test 2'
                            },
                            {
                                id: 3,
                                name: '3',
                                description: 'Test 3'
                            },
                            {
                                id: 4,
                                name: '4',
                                description: 'Test 4'
                            },
                        ],
                        option_description: 'description' 
                    },
                },{
                    field_type: 'selectdisabled',
                    config: {
                        key: 'main_ciiu_code5',
                        classes: 'md:col-12 sm:col-12',
                        label: 'Ciiu code (main)',
                        options: [
                            {
                                id: 1,
                                name: '1',
                                description: 'Test 1'
                            },
                            {
                                id: 2,
                                name: '2',
                                description: 'Test 2'
                            },
                            {
                                id: 3,
                                name: '3',
                                description: 'Test 3'
                            },
                            {
                                id: 4,
                                name: '4',
                                description: 'Test 4'
                            },
                        ],
                        option_description: 'description' 
                    },
                }
            ]
        },
    ],
    action_config: {
        show_cancel: true,
        show_back: false,
        show_next: true,
        next_text: 'Finish'
    }
}