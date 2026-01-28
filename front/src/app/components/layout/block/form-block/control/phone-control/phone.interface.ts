import { ILabel } from "../../partials/label/label.interface";

export interface IPhoneControl extends ILabel {
    supported_countries?: string[],
    default?: 'CO' | 'MX' | 'US',
}