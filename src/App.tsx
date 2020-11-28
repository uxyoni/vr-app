import React, { useState, useRef } from 'react';
import './App.css';
import DataWrapper from './data/DataWrapper';
import { UIContext } from './state/UIContext';
import { emptyDiv } from './data/Constants';

export default function App() {
  const [scrollElement, setScrollElement] = useState(emptyDiv);
  const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, viewHeight: 0, scrollHeight: 0 });
  const [renderTime, setRenderTime] = useState(Date.now());
  const data = useRef({ fullRequestData: [], filteredData: [] });
  const filterState = useRef({ text: '', labels: [], domains: [], deletedIds: new Set<string>() });
  const runRender = useRef(() => setRenderTime(Date.now()));

  return (
    <div className="App">
      <UIContext.Provider value={
        {
          scrollElement, setScrollElement, data: data.current,
          scrollPosition, setScrollPosition, runRender: runRender.current,
          filterState: filterState.current, renderTime
        }
      }>
        <DataWrapper/>
      </UIContext.Provider>
    </div >
  );
}
