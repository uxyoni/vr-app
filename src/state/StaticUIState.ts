import { RowData } from "../types/Types";

export const DefaultRowHeight = 32;
export const HeaderHeight = 40;
export const idToHeight:{[key: string]: number} = {};
export const idToExpanded:{[key: string]: boolean} = {};

export function getRowHeight(rowData:RowData){
    return idToHeight[rowData.id] ?? DefaultRowHeight;
}