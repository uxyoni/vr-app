import React, { useState, SyntheticEvent, useLayoutEffect, useRef, useContext } from "react";
import { RowData } from "../types/Types";
import { idToExpanded, idToHeight, DefaultRowHeight } from "../state/StaticUIState";
import { UIContext } from "../state/UIContext";

export function TableRow({ rowData }: { rowData: RowData }) {
    const { runRender } = useContext(UIContext);
    const [height, setHeight] = useState(idToHeight[rowData.id]);
    const [expand, setExpand] = useState(idToExpanded[rowData.id]);
    const root: { current: HTMLDivElement | null } = useRef(null);

    useLayoutEffect(() => {
        let newHeight = -1;
        if (expand) {
            newHeight = root.current?.clientHeight ?? -1;
        }
        idToExpanded[rowData.id] = expand;
        idToHeight[rowData.id] = newHeight > 0 ? newHeight : DefaultRowHeight;

        setHeight(newHeight);
        runRender();
    }, [expand, rowData])

    const onClick = () => {
        setExpand(!expand);
    }

    const classes = ['GridTableRow', 'GridTableBodyRow'];
    if (expand) {
        classes.push('Expanded');
    }
    return <div ref={root} className={classes.join(' ')} style={{ height: height > 0 ? height + 'px' : '' }} onClick={onClick}>
        <div><input onClick={e => e.stopPropagation()} type='checkbox' /></div>
        <div>{rowData.name}</div>
        <div>{rowData.id}</div>
        <div>{rowData.description}</div>
        <div>{rowData.domains.join(', ')}</div>
        <div>{rowData.labels.join(', ')}</div>
        <div>{rowData.value}</div>
    </div>
}