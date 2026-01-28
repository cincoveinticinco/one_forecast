import { IActionTable } from "../../../components/table/interfaces/action.interface";
import { IFormTemplate } from "../../../interfaces/field-layout-back.interface";

export const TEMPLATE_ACTIONS: IActionTable<IFormTemplate>[] = [
    {
        label: 'View new template',
        key: 'viewnewtemplate',
    },
    {
        label: 'View draft',
        key: 'viewdraft',
    },
    {
        label: 'Edit',
        key: 'edit',
        is_visible: (row) => row.status === 'draft',
    },
    {
        label: 'Duplicate',
        key: 'duplicate'
    },
    {
        label: 'Publish',
        key: 'publish',
        is_visible: (row) => row.status === 'draft',
    },
    {
        label: 'Unpublish',
        key: 'unpublish',
        is_visible: (row) => row.status === 'published'
    },
    {
        label: 'Archive',
        key: 'archive',
        is_visible: (row) => row.status !== 'archieved'
    },
    {
        label: 'Restore',
        key: 'restore',
        is_visible: (row) => row.status === 'archieved'
    },
    {
        label: 'Delete',
        key: 'delete'
    },
    {
        label: 'Copy URL',
        key: 'copyurl'
    },
    {
        label: 'Share URL',
        key: 'shareurl'
    },
    {
        label: 'View responses',
        key: 'viewresponses'
    },
]

export const TEMPLATE_GLOBAL_ACTIONS: IActionTable<IFormTemplate>[] = [
    {
        label: 'Create',
        key: 'create',
        icon: 'pi pi-plus'
    },
]