import { InjectionToken } from "@angular/core";
import { InputControl } from "../block/form-block/control/input-control/input-control";
import { ControlConfig } from "../interfaces/control-component.interface";
import { ArrayControl } from "../block/form-block/control/array-control/array-control";
import { SelectControl } from "../block/form-block/control/select-control/select-control";
import { PhoneControl } from "../block/form-block/control/phone-control/phone-control";
import { CurrencyControl } from "../block/form-block/control/currency-control/currency-control";
import { DateControl } from "../block/form-block/control/date-control/date-control";
import { TextareaControl } from "../block/form-block/control/textarea-control/textarea-control";
import { AddressControl } from "../block/form-block/control/address-control/address-control";
import { SelectDisabledControl } from "../block/form-block/control/select-disabled-control/select-disabled-control";
import { RadioControl } from "../block/form-block/control/radio-control/radio-control";
import { AutocompleteControl } from "../block/form-block/control/autocomplete-control/autocomplete-control";
import { CreditcardnumberControl } from "../block/form-block/control/creditcardnumber-control/creditcardnumber-control";
import { FileControl } from "../block/form-block/control/file-control/file-control";
import { NumberControl } from "../block/form-block/control/number-control/number-control";
import { CheckControl } from "../block/form-block/control/check-control/check-control";
import { ToggleControl } from "../block/form-block/control/toggle-control/toggle-control";

export const CONTROL_CONFIG: ControlConfig = {
    address: AddressControl,
    array: ArrayControl,
    autocomplete: AutocompleteControl,
    check: CheckControl,
    creditcardnumber: CreditcardnumberControl,
    currency: CurrencyControl,
    date: DateControl,
    file: FileControl,
    text: InputControl,
    toggle: ToggleControl,
    email: InputControl,
    number: NumberControl,
    phone: PhoneControl,
    radio: RadioControl,
    select: SelectControl,
    selectdisabled: SelectDisabledControl,
    textarea: TextareaControl,
}

export const CONTROL_CONFIG_TOKEN = new InjectionToken<string>('control_config');