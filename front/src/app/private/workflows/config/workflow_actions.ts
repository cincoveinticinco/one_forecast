import { IActionTable } from "../../../components/table/interfaces/action.interface";
import { IWorkflow } from "../../../interfaces/workflow.interface";

export const WORKFLOW_ACTIONS: IActionTable<IWorkflow>[] = [
    {
        label: 'Edit',
        key: 'edit',
    },
    {
        label: 'Delete',
        key: 'delete'
    },
    {
        label: 'Settings',
        key: 'settings'
    },
]

export const WORKFLOW_GLOBAL_ACTIONS: IActionTable<IWorkflow>[] = [
    {
        label: 'Create',
        key: 'create',
        icon: 'pi pi-plus'
    },
]