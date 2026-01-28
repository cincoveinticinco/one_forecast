export interface IWorkflowStep {
    name?:                 string;
    step_type?:            string;
    color?:                string;
    order_index?:          number;
    form_template_id?:     number;
    assignees?:            Assignee[];
    actions_enabled?:      string[];
    actions?:              Record<string, On[]>;
    file_upload_settings?: FileUploadSettings;
}

export interface On {
    type:    string;
    to:      To[];
    subject: string;
    body:    string;
}

export interface To {
    type:  string;
    value: string;
}

export interface Assignee {
    type:  string;
    value: number | string;
}

export interface FileUploadSettings {
    max_files:          number;
    allowed_extensions: string[];
    max_size_mb:        number;
}
