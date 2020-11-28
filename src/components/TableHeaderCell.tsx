import React from "react";

interface TableHeaderCellProps {
    title?: string,
    onClick?: () => void,
    isSortable?: boolean,
    sortDirection?: 'asc' | 'desc' | 'none',
    isChecked?: boolean,
}

export function TableHeaderCell({ title, onClick, isSortable, sortDirection, isChecked }: TableHeaderCellProps) {
    let content;
    if ((title ?? '').length === 0) {
        content = <input type='checkbox' checked={isChecked} onChange={onClick} />
    }else {
        content = <div>{title}</div>
    }
    return <div className="TableHeaderCell">{content}</div>
}