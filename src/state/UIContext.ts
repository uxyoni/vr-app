import React from "react";
import { RowData, Label, Domain } from "../types/Types";

export interface Filter {
    text: string, labels: Label[], domains: Domain[], deletedIds: Set<string>
}

export interface UIContextType {
    scrollElement?: HTMLDivElement,
    setScrollElement: (value: HTMLDivElement) => void,
    data: { fullRequestData: RowData[], filteredData: RowData[] },
    scrollPosition: { scrollTop: number, viewHeight: number, scrollHeight: number },
    filterState: Filter,
    setScrollPosition: (value: any) => void,
    renderTime: number,
    runRender: () => void
}

export const UIContext = React.createContext<UIContextType>(
    {
        setScrollElement: () => { },
        data: { fullRequestData: [], filteredData: [] },
        scrollPosition: { scrollTop: 0, viewHeight: 0, scrollHeight: 0 },
        setScrollPosition: () => { },
        runRender: () => { },
        renderTime: 0,
        filterState: { text: '', labels: [], domains: [], deletedIds: new Set() }
    }
);