import { createMockRows } from "../mock/MockData"
import { RowData } from "../types/Types";

export async function fetchNextDataBatch(startIndex: number, count: number): Promise<RowData[]> {
    return new Promise<RowData[]>(resolve => setTimeout(()=>{
        resolve(createMockRows(count));
    }, 500));
}