import { ILayout } from "../../components/layout/interfaces/layout.interface";

export const setDataLayout = ( layout: ILayout, data: any[], current_id: number ): ILayout => {

    const section = layout.blocks?.find(b => b.field_type === 'section');
    const row = data.find(d => d.id === current_id);
    if (!section || !section.children || !row) return layout;
    for (const [keyfield, valuefield] of Object.entries(row!)) {
        const child = section.children.find(child => child.config.key === keyfield);
        if (!child) continue;
        child.config.value = valuefield;
    }

    return layout;

}