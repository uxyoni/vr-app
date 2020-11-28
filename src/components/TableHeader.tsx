import React from "react";
import { TableHeaderCell } from "./TableHeaderCell";

export function TableHeader() {
    return <div className={'GridTableRow GridTableHeaderRow'}>
        <TableHeaderCell />
        <TableHeaderCell title="NAME" isSortable={true} onClick={() => { }} />
        <TableHeaderCell title="VARIABLE ID" isSortable={true} onClick={() => { }} />
        <TableHeaderCell title="DESCRIPTION" />
        <TableHeaderCell title="DOMAINS" />
        <TableHeaderCell title="LABELS" />
        <TableHeaderCell title="VALUE" isSortable={true} onClick={() => { }} />
    </div>
}