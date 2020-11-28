import React, { ChangeEvent, useContext, useState, useEffect } from "react";
import { UIContext } from "../state/UIContext";
import MultiSelect from "react-multi-select-component";
import { Domains, Labels } from "../types/Types";

export default function FilterSection() {
  const { filterState, runRender } = useContext(UIContext);
  const [labels, setLabels] = useState([]);
  const [domains, setDomains] = useState([]);


  const onTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    filterState.text = event.target.value;
    runRender();
  }

  useEffect(() => {
    filterState.labels = labels.map(option => option['value']);
    runRender();
  }, [labels]);

  useEffect(() => {
    filterState.domains = domains.map(option => option['value']);
    runRender();
  }, [domains]);

  return (<div className="FilterSection">
    <input style={{ height: '36px', padding: '10px', width: '160px' }} type="text" placeholder="Filter text" onChange={debounce(onTextInput, 500)} />
    <div style={{ minWidth: '200px' }}>
      <MultiSelect value={domains} options={Domains.map(val => { return { value: val, label: val } })} labelledBy="Select domain"
       overrideStrings={{
        selectSomeItems: "Select domains"
       }}
       onChange={setDomains} />
    </div>
    <div style={{ minWidth: '200px' }}>
      <MultiSelect value={labels} options={Labels.map(val => { return { value: val, label: val } })} labelledBy="Select labels"
       overrideStrings={{
        selectSomeItems: "Select labels"
       }}
       onChange={setLabels} />
    </div>
  </div>);
}

function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number,
): (...args: Params) => void {
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}