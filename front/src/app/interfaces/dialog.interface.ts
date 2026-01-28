export interface IDialog {
    header: string;
    component: any,
    data?: any;
    input_values?: any;
    maximizable?: boolean;
    modal?: boolean;
    breakpoints?: any;
    width?: string;
}