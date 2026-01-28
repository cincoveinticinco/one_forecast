import { IBlock } from "../../components/layout/interfaces/block.interface";
import { IEffect } from "../../components/layout/interfaces/effect.interface";
import { IValidator } from "../../components/layout/interfaces/validator.interface";
import { IFieldLayoutBack, Item } from "../../interfaces/field-layout-back.interface";

export const getMapperBlock = (field: IFieldLayoutBack): IBlock => {
    const mapper = mapperFields[field.field_type!];
    return { field_type: field.field_type, ...mapper(field) };
}


//todo: split in different files
const fieldDefault = (field: IFieldLayoutBack) => ({
    config: {
        disabled: field.disabled,
        placeholder: field.placeholder,
        key: field.key,
        help_text: field.help_text,
        id_back: field.id_back,
        value: field.response,
        validators: getValidators(field),
        effects: getEffects(field),
        ...fieldText(field).config,
    }
});

const fieldText = (field: IFieldLayoutBack) => ({
    config: {
        classes: field.settings?.classes,
        label: field.label,
        id: field.id
    }
});

const fieldTitle = (field: IFieldLayoutBack) => ({
    config: {
        ...fieldText(field).config,
        has_separator: field.settings?.has_separator
    }
});

const fieldSelect = (field: IFieldLayoutBack) => ({
    config: {
        ...fieldDefault(field).config,
        options: field.options?.items?.filter(option => !option.visible_if)
    }
});

const fieldPhone = (field: IFieldLayoutBack) => ({
    config: {
        ...fieldDefault(field).config,
        supported_countries: field.settings?.supported_countries,
        default: field.settings?.default_country
    }
});

const fieldSection = (field: IFieldLayoutBack) => ({
    config: {
        ...fieldDefault(field).config,
    },
    children: field.children?.map(child => getMapperBlock({...child, key_parent: field.key}))
});

const getValidators = (field: IFieldLayoutBack) => {
    const validators: IValidator[] = [];
    if (field.required) {
        validators.push({validator_type: 'required'})
    }
    if (field.validations) {
        for (const [key, value] of Object.entries(field.validations)) {
            validators.push({validator_type: key, value})
        }
    }
    return validators;
}

const getEffects = (field: IFieldLayoutBack) => {
    const effects: IEffect[] = [];

    if (field.options?.items?.some(option => option.visible_if)) {
        const targetPaths: Record<string, IEffect> = {};
        for (const item of field.options.items) {
            if (!item.visible_if?.field_key) continue;
            if (targetPaths[item.visible_if.field_key]) continue;
            targetPaths[item.visible_if.field_key] = {
                effect_type: 'changelist',
                key_control: field.key,
                target_path: `${field.key_parent}.${item.visible_if.field_key}`,
                params: getChangeListParams(field.options.items)
            }
            effects.push(targetPaths[item.visible_if.field_key]);
        }
    }

    return effects;
}

const getChangeListParams = (items: Item[]) => {
    const valuesPath: Record<string, any> = {};
    items = items.filter(item => item.visible_if);

    for (const item of items) {
        if (!item.visible_if?.value) continue;
        const newItem = {
            label: item.label,
            value: item.value,
            visible_if: true
        }
        if (valuesPath[item.visible_if.value] && valuesPath[item.visible_if.value].operator === item.visible_if.op) {
            valuesPath[item.visible_if.value].options.push(newItem);
        } else {
            valuesPath[item.visible_if.value] = {
                value: item.visible_if.value,
                operator: item.visible_if.op,
                options: [newItem]
            }
        }
    }

    return [Object.values(valuesPath)];
}

const mapperFields: Record<string, (field: any) => any> = {
    heading: fieldTitle,
    paragraph: fieldText,
    select: fieldSelect,
    section: fieldSection,
    number: fieldDefault,
    text: fieldDefault,
    email: fieldDefault,
    phone: fieldPhone,
}



