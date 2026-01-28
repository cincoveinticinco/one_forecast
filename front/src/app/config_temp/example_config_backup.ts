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
                label: 'Provider data', // title value
            },
            children: [
                {
                    field_type: 'text',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        help_text: 'test',
                        key: 'personal_type1',
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
                        help_text: 'document',
                        key: 'document_type2',
                        label: 'Document type',
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
                        key: 'personal_type',
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        disabled: false,
                        label: 'Provider type',
                        options: [
                            {
                                id: 1,
                                name: 'Natural',
                            },
                            {
                                id: 2,
                                name: 'Juridica',
                            },
                        ],
                        option_value: 'id',
                        option_label: 'name',
                        searchable: true,
                        multiple: false,
                        add_options: true,
                        value: null
                    },
                },
                {
                    field_type: 'select',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        key: 'document_type',
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        effects: [
                            {
                                effect_type: 'changelist',
                                key: 'changelistdocumenttypeeffect',
                                key_control: 'document_type',
                                target_path: 'provider_data.personal_type',
                                params: [
                                    [
                                        {
                                            value: 1,
                                            options: [
                                                {
                                                    id: 1,
                                                    name: 'Cédula de ciudadanía'
                                                },
                                                {
                                                    id: 2,
                                                    name: 'Pasaporte'
                                                },
                                                {
                                                    id: 3,
                                                    name: 'Cédula de extranjería'
                                                },
                                            ]
                                        },
                                        {
                                            value: 2,
                                            options: [
                                                {
                                                    id: 1,
                                                    name: 'NIT'
                                                }
                                            ]
                                        }
                                    ]
                                ]
                            }
                        ],
                        disabled: false,
                        label: 'Document type',
                        option_value: 'id',
                        option_label: 'name',
                        value: null
                    },
                },
                {
                    field_type: 'select',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        key: 'country_currency',
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        disabled: false,
                        label: 'Country currency',
                        options: [
                            {
                                id: 1,
                                name: 'Colombia',
                                currency: 'COP',
                                locale: 'en-CO',
                            },
                            {
                                id: 2,
                                name: 'México',
                                currency: 'MXN',
                                locale: 'en-MX',
                            },
                            {
                                id: 3,
                                name: 'United states',
                                currency: 'USD',
                                locale: 'en-US',
                            },
                        ],
                        option_label: 'name',
                        searchable: true,
                        multiple: false,
                        value: null
                    },
                },
                {
                    field_type: 'currency',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        key: 'value',
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        effects: [
                            {
                                effect_type: 'changecurrency',
                                key_control: 'value',
                                target_path: 'provider_data.country_currency',
                                params: [
                                    'provider_data.country_currency',
                                ]
                            }
                        ],
                        disabled: false,
                        label: 'Value',
                        value: null
                    }
                },
                {
                    field_type: 'phone',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        key: 'description',
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        disabled: false,
                        label: 'Phone',
                        show_countries: true,
                        value: null
                    }
                },
                {
                    field_type: 'date',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        key: 'date_start',
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        min_date: '12/10/2025',
                        disabled: false,
                        label: 'Start date',
                        value: null
                    }
                },
                {
                    field_type: 'textarea',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        key: 'description',
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        disabled: false,
                        label: 'Description',
                        rows: 2,
                        value: null
                    }
                },
                {
                    field_type: 'multiple',
                    config: {
                        key: 'other_activities',
                        classes: 'col-12'
                    },
                    children: [
                        {
                            field_type: 'text',
                            config: {
                                classes: 'md:col-4 sm:col-12',
                                disabled: false,
                                id: 0,
                                label: 'Other activity',
                                type: 'text',
                                value: null,
                                validators: [
                                    {
                                        validator_type: 'required',
                                    }
                                ],
                            }
                        }
                    ]
                },
                {
                    field_type: 'address',
                    config: {
                        key: 'address',
                        classes: 'col-12'
                    }
                },
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
                    field_type: 'radio',
                    config: {
                        key: 'brands',
                        classes: 'md:col-2 sm:col-12',
                        label: 'Exclusice country brand',
                        options: [
                            {
                                value: 1,
                                name: 'Yes'
                            },
                            {
                                value: 2,
                                name: 'No'
                            },
                        ],
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        dependent_value: 1
                    }
                },
                {
                    field_type: 'text',
                    config: {
                        classes: 'md:col-8 sm:col-12',
                        disabled: false,
                        key: 'brand_option',
                        label: 'Which?',
                        type: 'text',
                        value: null,
                        effects: [
                            {
                                effect_type: 'hidden',
                                key_control: 'brand_option',
                                target_path: 'provider_data.brands',
                                value_path: [1]
                            }
                        ],
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    },
                },
                {
                    field_type: 'check',
                    config: {
                        key: 'contributor_type',
                        classes: 'md:col-6 sm:col-12',
                        label: 'Contributor type',
                        options: [
                            {
                                value: 'self-retainer',
                                name: 'Self-retainer'
                            },
                            {
                                value: 'major_contributor',
                                name: 'Major contributor'
                            },
                            {
                                value: 'exempt',
                                name: 'Exempt'
                            },
                        ],
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                    }
                },
                {
                    field_type: 'autocomplete',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        key: 'scene',
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        disabled: false,
                        label: 'Scene',
                        options: [
                            {
                                id: 1,
                                name: 'Cast',
                            },
                            {
                                id: 2,
                                name: 'Figurantes',
                            },
                            {
                                id: 3,
                                name: 'Stunts',
                            },
                        ],
                        option_value: 'id',
                        option_label: 'name',
                        value: null
                    },
                },
                {
                    field_type: 'creditcardnumber',
                    config: {
                        classes: 'md:col-6 sm:col-12',
                        disabled: false,
                        key: 'credit_card_number',
                        label: 'Credit card number',
                        value: null,
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        number_to_show: 4
                    },
                },
                {
                    field_type: 'array',
                    config: {
                        key: 'substitutes_data',
                        blocks: [
                            {
                                field_type: 'text',
                                config: {
                                    classes: 'md:col-6 sm:col-12',
                                    disabled: false,
                                    help_text: 'test',
                                    key: 'substitute_name',
                                    label: 'Substitute name',
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
                                    key: 'substitute_lastname',
                                    label: 'Substitute lastname',
                                    type: 'text',
                                    value: null,
                                    validators: [
                                        {
                                            validator_type: 'required',
                                        }
                                    ],
                                },
                            },
                        ],
                        has_initial: true,
                        add_config: {
                            show_add: true,
                            show_index: true,
                            add_text: 'Add',
                            limit: 5,
                            can_remove_first: false
                        } 
                    }
                },
                {
                    field_type: 'file',
                    config: {
                        classes: 'md:col-12 sm:col-12',
                        disabled: false,
                        help_text: 'test',
                        key: 'files',
                        label: 'Files',
                        validators: [
                            {
                                validator_type: 'required',
                            }
                        ],
                        extensions_allowed: '.pdf',
                        multiple: true,
                        url: 'https://www.primefaces.org/cdn/api/upload.php'
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