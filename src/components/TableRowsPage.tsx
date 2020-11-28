import React, { useContext } from "react";
import { RowData } from "../types/Types";
import { getRowHeight } from "../state/StaticUIState";
import { UIContext } from "../state/UIContext";
import { rowsPerPage, emptyDiv } from "../data/Constants";
import { TableRow } from "./TableRow";

export function TableRowsPage({ startIndex, top }: { startIndex: number, top: number }) {
    const { data, scrollPosition } = useContext(UIContext);
    const rowDataArr = data.filteredData.slice(startIndex, startIndex + rowsPerPage);
    let pageHeight = 0;
    rowDataArr.forEach(rowData => pageHeight += getRowHeight(rowData));
    const isVisible = getIsVisible(scrollPosition.scrollTop, scrollPosition.viewHeight, top, pageHeight);
    return isVisible ?
        <>{rowDataArr.map((rowData: RowData) => <TableRow rowData={rowData} key={rowData.id} />)}</> :
        <EmptyPlaceHolder height={pageHeight} />;
}

function EmptyPlaceHolder({ height }: { height: number }) {
    return (<div className="GridTableRow GridTableBodyRow EmptyPlaceHolder" style={{ height: height + 'px' }} />)
}

function getIsVisible(scrollTop: number, viewHeight: number, top: number, height: number): boolean {
    const extraMargin = 2 * viewHeight;
    return (top + height + extraMargin > scrollTop) && (top < scrollTop + viewHeight + extraMargin);
}