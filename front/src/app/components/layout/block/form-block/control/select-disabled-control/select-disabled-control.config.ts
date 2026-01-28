import { IBlock } from "../../../../interfaces/block.interface";

export const SelectDisabledControlConfig: IBlock[] = [
    {
        field_type: 'select',
        config: {
            classes: 'md:col-4 sm:col-12',
            id: 'parent',
            validators: [
                {
                    validator_type: 'required',
                }
            ],
            disabled: false,
            option_label: 'name',
            searchable: true,
            multiple: false,
            value: null
        }
    },
    {
        field_type: 'text',
        config: {
            classes: 'md:col-8 sm:col-12 mb-0-5',
            disabled: true,
            id: 'children',
            type: 'text',
            value: null,
        }
    }
];