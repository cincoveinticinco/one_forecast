import { IBlock } from "../../../../../interfaces/block.interface"

export const ACTIONS_LAYOUT = (action: string): IBlock[] => {
    const actions: Record<string, IBlock[]> = {
        email: EMAIL_ACTION_LAYOUT
    }
    return actions[action];
}

export const EMAIL_ACTION_LAYOUT: IBlock[] = [
    {
        field_type: 'array',
        config: {
            key: 'to',
            label: 'Recipients list',
            disabled: false,
            blocks: [
                {
                    field_type: 'text',
                    config: {
                        hidden: true,
                        key: 'type',
                        value: 'email'
                    }
                },
                {
                    field_type: 'text',
                    config: {
                        classes: 'md:col-12 sm:col-12',
                        disabled: false,
                        key: 'value',
                        label: 'Email',
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
                add_text: 'Add recipient',
                limit: 3,
                can_remove_first: false
            } 
        }
    },
    {
        field_type: 'text',
        config: {
            key: 'subject',
            label: 'Subject',
            disabled: false,
            type: 'text',
            classes: 'md:col-12 sm:col-12',
            validators: [
                {
                    validator_type: 'required',
                }
            ],

        }
    },
    {
        field_type: 'textarea',
        config: {
            classes: 'md:col-12 sm:col-12',
            key: 'body',
            validators: [
                {
                    validator_type: 'required',
                }
            ],
            disabled: false,
            label: 'Body',
            rows: 2,
            value: null
        }
    },
    {
        field_type: 'text',
        config: {
            hidden: true,
            key: 'type',
            value: 'email'
        }
    },
]