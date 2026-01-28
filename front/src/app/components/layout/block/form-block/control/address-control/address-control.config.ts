import { IBlock } from "../../../../interfaces/block.interface";

export const AddressControlConfig: IBlock[] = [
    {
        field_type: 'select',
        config: {
            classes: 'md:col-2 sm:col-12',
            id: 'country',
            validators: [
                {
                    validator_type: 'required',
                }
            ],
            disabled: false,
            label: 'Country',
            options: [
                {
                    id: 1,
                    name: 'Colombia',
                },
                {
                    id: 2,
                    name: 'México',
                },
            ],
            option_value: 'id',
            option_label: 'name',
            searchable: true,
            multiple: false,
            value: null
        }
    },
    {
        field_type: 'select',
        config: {
            classes: 'md:col-2 sm:col-12',
            id: 'city',
            validators: [
                {
                    validator_type: 'required',
                }
            ],
            disabled: false,
            label: 'City',
            options: [
                {
                    id: 1,
                    name: 'Bogotá',
                },
                {
                    id: 2,
                    name: 'Medellín',
                },
            ],
            option_value: 'id',
            option_label: 'name',
            searchable: true,
            multiple: false,
            value: null
        }
    },
    {
        field_type: 'text',
        config: {
            classes: 'md:col-4 sm:col-12',
            disabled: false,
            id: 'address',
            label: 'Address',
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
            classes: 'md:col-2 sm:col-12',
            disabled: false,
            id: 'apto_office',
            label: 'Apto / Office',
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
            classes: 'md:col-2 sm:col-12',
            disabled: false,
            id: 'zip_code',
            label: 'Zip code',
            type: 'number',
            value: null,
            validators: [
                {
                    validator_type: 'required',
                }
            ],
        },
    },
];