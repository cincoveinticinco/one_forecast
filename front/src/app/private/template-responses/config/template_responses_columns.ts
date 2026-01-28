import { IColumn } from "../../../components/table/interfaces/column.interface";

export const TEMPLATE_RESPONSES_COLUMNS: IColumn[] = [
    {
        header: 'Form template name',
        key: 'form_template_name',
        column_type: 'text',
    },
    {
        header: 'Submission status',
        key: 'status',
        column_type: 'text',
        filter: {
            key: 'status',
            filter_type: 'select',
            value: null
        }
    },
]

export const END_TEMPLATE_RESPONSES_COLUMNS: IColumn[] = [
    {
        header: 'Submitted At',
        key: 'submitted_at',
        column_type: 'date',
        filter: {
            key: 'submitted_at',
            filter_type: 'date',
            value: null
        }
    },
    {
        header: 'Updated At',
        key: 'updated_at',
        column_type: 'date',
        filter: {
            key: 'updated_at',
            filter_type: 'date',
            value: null
        }
    },
    {
        header: 'Created At',
        key: 'created_at',
        column_type: 'date',
        filter: {
            key: 'created_at',
            filter_type: 'date',
            value: null
        }
    },
]