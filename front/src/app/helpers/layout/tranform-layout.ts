import { cloneDeep } from "lodash";
import { IBlock } from "../../components/layout/interfaces/block.interface";
import { ILayout } from "../../components/layout/interfaces/layout.interface";
import { getMapperBlock } from "./get-config-block";
import { IFieldLayoutBack } from "../../interfaces/field-layout-back.interface";

export const transformLayout: (layout: IFieldLayoutBack[], functions: Function[]) => ILayout = (layout, functions) => {

    const blocks: IBlock[] = [];

    for (const field of layout) {
        const block: IBlock = cloneDeep(getMapperBlock(field));
        blocks.push(block);
    }

    return {
        title: '',
        blocks,
        effects: [
            {
                effect_type: 'autosave',
                params: functions
            }
        ],
        action_config: {
            show_cancel: true,
            show_back: false,
            show_next: true,
            next_text: 'Finalizar',
            cancel_text: 'Cancelar',
        },
    }

}