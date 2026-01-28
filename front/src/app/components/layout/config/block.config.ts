import { InjectionToken } from "@angular/core";
import { FormBlock } from "../block/form-block/form-block";
import { BlockConfig } from "../interfaces/block-component.interface";
import { TitleBlock } from "../block/title-block/title-block";
import { TextBlock } from "../block/text-block/text-block";
import { FormControlBlock } from "../block/form-control-block/form-control-block";
import { MultipleBlock } from "../block/multiple-block/multiple-block";

export const BLOCK_CONFIG: BlockConfig = {
    section: FormBlock,
    heading: TitleBlock,
    paragraph: TextBlock,
    array: FormControlBlock,
    text: FormControlBlock,
    toggle: FormControlBlock,
    email: FormControlBlock,
    number: FormControlBlock,
    select: FormControlBlock,
    textarea: FormControlBlock,
    currency: FormControlBlock,
    date: FormControlBlock,
    phone: FormControlBlock,
    address: FormControlBlock,
    selectdisabled: FormControlBlock,
    radio: FormControlBlock,
    check: FormControlBlock,
    autocomplete: FormControlBlock,
    creditcardnumber: FormControlBlock,
    file: FormControlBlock,
    multiple: MultipleBlock,
}

export const BLOCK_CONFIG_TOKEN = new InjectionToken<string>('BLOCK_CONFIG');