import { Confirmation } from "primeng/api";

export interface IConfirmDialog extends Confirmation {
    on_accept: () => void;
    on_rejected?: () => void;
}