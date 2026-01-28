export interface IFormTemplate {
    name?: string;
    status?: 'published' | 'archieved' | 'restored' | 'draft';
    template_type?: string;
    access_type?: string;
    published_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    archived_at?: Date;
    tenant_slug?: string;
    slug?: string;
    id?: number;
    tenant_id?: number;
    url_front?: string;
}

export interface IFieldLayoutBack {
    children?:         IFieldLayoutBack[];
    created_at?:       Date;
    disabled?:         boolean;
    field_type?:       FieldType;
    form_template_id?: number;
    help_text?:        string;
    placeholder?:      string;
    id?:               number;
    id_back?:          number;
    is_active?:        boolean;
    is_system?:        boolean;
    key?:              string;
    key_parent?:       string;
    label?:            string;
    options?:          Options;
    order_index?:      number;
    parent_field_id?:  number;
    required?:         boolean;
    settings?:         Settings;
    type?:             string;
    updated_at?:       Date;
    response?:         any;
    validations?:      Validations;
}

type FieldType = 'section' | 'heading' | 'paragraph' | 'select' | 'email' | 'phone' | 'number' | 'text';

interface Options {
    items?: Item[];
}

export interface Item {
    label?:       string;
    value?:       string;
    visible_if?:  VisibleIf;
}

interface VisibleIf {
    op?:        string;
    value?:     string;
    field_key?: string;
}

interface Settings {
    classes?:            string;
    has_separator?:      boolean;
    default_country:     string;
    supported_countries: string[];
}

interface Validations {
    pattern?:   string;
    maxlength:  number;
    minlength?: number;
}
