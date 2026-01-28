export interface IBlock {
    key?: string;
    field_type?: FieldType;
    id?: string;
    config?: any;
    children?: IBlock[]
}

type FieldType = 'toggle' | 'section' | 'heading' | 'paragraph' | 'array' | 'text' | 'email' | 'number' | 'select' | 'textarea' | 'currency' | 'date' | 'phone' | 'address' | 'selectdisabled' | 'radio' | 'check' | 'autocomplete' | 'creditcardnumber' | 'file' | 'multiple' | 'action';