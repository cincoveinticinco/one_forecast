import { On, IWorkflowStep } from "../../interfaces/workflow-step.interface";

export const transformCreateData = (data: any): IWorkflowStep => {

    const workflow_step = {
        ...data.workflow_step,
        actions_enabled: getActionsEnabled(data.workflow_step),
        //pending assignes
        actions: getActions(data.actions)
    }

    return workflow_step
}

export const getActionsEnabled = (data: any): string[] => {
    const actions_enabled = [];
    if (data.reject) actions_enabled.push('reject'); 
    if (data.return) actions_enabled.push('request_changes'); 
    if (data.approve) actions_enabled.push('approve'); 
    return actions_enabled;
}

export const getActions = (data: Record<string, any>): Record<string, On[]> => {
    const actions: Record<string, On[]> = {};
    for (const [keyaction, action] of Object.entries(data)) {
        if (!action['action']) continue;
        actions[keyaction] = action.actions;
    }
    return actions;
}