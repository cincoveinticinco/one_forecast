import { IColumn } from "../../../components/table/interfaces/column.interface";

export const WORKFLOW_STEPS_COLUMNS: IColumn[] = [
    {
        header: 'Order',
        key: 'order',
        column_type: 'text'
    },
    {
        header: 'Name',
        key: 'name',
        column_type: 'text',
    },
    {
        header: 'Step type',
        key: 'step_type',
        column_type: 'text',
        // filter: {
        //     filter_type: 'select',
        //     key: 'step_type',
        //     value: null
        // }
    },
    {
        header: 'Assigners',
        key: 'assigners',
        column_type: 'text',
    },
    {
        header: 'Created at',
        key: 'created_at',
        column_type: 'date',
    },
    {
        header: 'Updated at',
        key: 'updated_at',
        column_type: 'date',
    },
]