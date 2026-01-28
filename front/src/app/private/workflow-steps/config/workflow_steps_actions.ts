import { IActionTable } from "../../../components/table/interfaces/action.interface";
import { IWorkflowStep } from "../../../interfaces/workflow-step.interface";

export const WORKFLOW_STEPS_ACTIONS: IActionTable<IWorkflowStep>[] = [
    {
        label: 'Edit',
        key: 'edit',
    },
    {
        label: 'Delete',
        key: 'delete'
    },
]

export const WORKFLOW_STEPS_GLOBAL_ACTIONS: IActionTable<IWorkflowStep>[] = [
    {
        label: 'Add step',
        key: 'create',
        icon: 'pi pi-plus'
    },
]