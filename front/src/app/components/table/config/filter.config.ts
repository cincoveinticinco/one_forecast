import { InjectionToken } from "@angular/core";
import { FilterConfig } from "../interfaces/filter-component.interface";
import { TextFilter } from "../filter/text-filter/text-filter";
import { SelectFilter } from "../filter/select-filter/select-filter";
import { DateFilter } from "../filter/date-filter/date-filter";
import { CheckFilter } from "../filter/check-filter/check-filter";

export const FILTER_CONFIG: FilterConfig = {
    text: TextFilter,
    number: TextFilter,
    email: TextFilter,
    phone: TextFilter,
    select: SelectFilter,
    date: DateFilter,
    check: CheckFilter,
}

export const FILTER_CONFIG_TOKEN = new InjectionToken<string>('FILTER_CONFIG');