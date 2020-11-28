import React, { useEffect, useContext, useCallback, useRef, useLayoutEffect, useState } from "react";
import { UIContext, Filter } from "../state/UIContext";
import { fetchNextDataBatch } from "./MockAPIs";
import { rowsPerRequest, emptyDiv, rowsPerPage } from "./Constants";
import { RowData } from "../types/Types";
import { Table } from "../components/Table";
import FilterSection from "../components/FilterSection";

interface DataWrapperProps {
    children?: JSX.Element | JSX.Element[]
}

export default function DataWrapper({ children }: DataWrapperProps) {
    const { scrollElement = emptyDiv, data, scrollPosition, setScrollPosition, runRender, renderTime, filterState } = useContext(UIContext);
    const [isMiddleOfRequest, setIsMiddleOfRequest] = useState(false);

    const fetchData = async (startIndex: number | undefined = 0) => {
        if (isMiddleOfRequest) {
            return;
        }
        setIsMiddleOfRequest(true);
        const nextBatch = await fetchNextDataBatch(startIndex, rowsPerRequest);
        const prevLength = data.filteredData.length;
        data.fullRequestData.push(...nextBatch);
        data.filteredData = filterData(data.fullRequestData, filterState);
        setIsMiddleOfRequest(false);
        // Only if the data changed trigger the lifecycle again
        if (prevLength !== data.filteredData.length) {
            runRender();
        }
    };

    const onScroll = () => {
        setScrollPosition({
            scrollTop: scrollElement?.scrollTop,
            viewHeight: scrollElement?.clientHeight,
            scrollHeight: scrollElement?.scrollHeight
        });
    };

    useLayoutEffect(() => {
        data.filteredData = filterData(data.fullRequestData, filterState);
        onScroll();
    }, [renderTime])

    useEffect(() => {
        const scrollTop = scrollPosition.scrollTop;
        const scrollHeight = scrollPosition.scrollHeight;
        const viewHeight = scrollPosition.viewHeight;
        if (scrollTop > (scrollHeight - 2 * viewHeight)) {
            fetchData();
        }
    }, [scrollPosition])

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        scrollElement?.addEventListener('scroll', onScroll);
        return () => {
            scrollElement?.removeEventListener('scroll', onScroll);
        }
    }, [scrollElement]);

    return (
        <div style={{ padding: '16px' }}>
            <FilterSection />
            <Table isMiddleOfRequest={isMiddleOfRequest}/>
        </div>
    );
}

function filterData(fullArr: RowData[], filter: Filter): RowData[] {
    return fullArr.filter(rowData => {
        const lowerCaseText = filter.text.toLocaleLowerCase();
        const textMatch = rowData.name.toLocaleLowerCase().includes(lowerCaseText) ||
            rowData.description.toLocaleLowerCase().includes(lowerCaseText);
        const labelsMatch = doesArrayContainFilterArray(rowData.labels, filter.labels);
        const domainMatch = doesArrayContainFilterArray(rowData.domains, filter.domains);
        return textMatch && labelsMatch && domainMatch;
    });
}

function doesArrayContainFilterArray(mainArr: any[], filterArr: any[]): boolean {
    let doesIt = true;
    filterArr.forEach(item => doesIt = doesIt && mainArr.includes(item));
    return doesIt;
}