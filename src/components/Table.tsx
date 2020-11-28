import React, { useContext, useEffect, useRef, ReactNode } from "react";
import { TableHeader } from "./TableHeader";
import { RowData } from "../types/Types";
import { UIContext } from "../state/UIContext";
import { emptyDiv, rowsPerPage } from "../data/Constants";
import { HeaderHeight, getRowHeight } from "../state/StaticUIState";
import { TableRowsPage } from "./TableRowsPage";

export function Table({ isMiddleOfRequest }: { isMiddleOfRequest: boolean }): JSX.Element {
    const { setScrollElement, data } = useContext(UIContext);
    const scrollElement = useRef(null);

    useEffect(() => {
        setScrollElement(scrollElement.current ?? emptyDiv);
    }, [scrollElement]);

    const pages: ReactNode[] = [];

    let top = HeaderHeight;
    data.filteredData.forEach((rowData: RowData, index: number) => {
        const height = getRowHeight(rowData);
        if (index % rowsPerPage === 0) {
            pages.push(<TableRowsPage startIndex={index} top={top} key={index} />);
        }
        top += height;
    })
    const isLoading = isMiddleOfRequest;
    const isEmptyData = data.fullRequestData.length > 0 && data.filteredData.length === 0;
    return (
        <div className="TableWrapper" ref={scrollElement}>
            <div className="GridTable">
                <TableHeader />
                {pages}
            </div>
            {(isLoading || isEmptyData) &&
                <p style={{ textAlign: 'center' }}>{
                    isLoading ? "Loading..." : "No match :/"
                }</p>}

        </div>)
}