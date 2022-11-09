import * as React from 'react'
// import { useState, useEffect} from 'react';
import FunctionDetails from '../components/FunctionDetails';
import { useFunctionContext } from '../context/FunctionContext';
import Home from '../components/Home';
// import GraphComponent from '../components/GraphComponent'
import { useGraphContext } from '../context/GraphContext';
import CreateGraph from '../components/CreateGraph';
import PricingDetails from '../components/PricingDetails';
import PermissionsDetails from '../components/PermissionsDetails';


const MainContainer = () => {
  const { isMetricsEnabled, isPricingEnabled, isHomeEnabled, isPermissionsEnabled } = useFunctionContext();
  const { createGraphIsShown } = useGraphContext();
  const { functionName } = useFunctionContext();
  const [priceHistoryStats, setPriceHistoryStats] = React.useState({});
  // const [ loading, setLoading ] = React.useState(false);

  // React.useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   },3000)
  // })

  const [defaultFunctionConfig, setDefaultFunctionConfig] = React.useState({});
  const [permissionList, setPermissionList] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/price/defaultConfig',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ functionName: functionName })
      })
      .then(response => response.json())
      .then(data => {
        console.log('default function config: ', data);
        setDefaultFunctionConfig(data)});
  }, [functionName]);

  // fetch list of permissions for the current function
  React.useEffect(() => {
    fetch('http://localhost:3000/permission/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ functionName: functionName })
    })
      .then(response => response.json())
      .then(data => {
        /* should return an array of objects with the following shape:
            statementId,
            action, 
            resource,
            principal */
        console.log('List of permissions: ', data);
        setPermissionList(data);
      })
  }, [functionName]);
  
  return (
    <div className="bg-[#d6d4d4] dark:bg-[#191919] min-h-screen w-screen px-4/5">
        {createGraphIsShown ? <CreateGraph /> : null}
        {isMetricsEnabled ? <FunctionDetails /> : null}
        {isPricingEnabled ? <PricingDetails defaultFunctionConfig={defaultFunctionConfig} /> : null}
        {isPermissionsEnabled ? <PermissionsDetails permissionList={permissionList} setPermissionList={setPermissionList} /> : null}
        {isHomeEnabled ? <Home /> : null}
    </div>
  )
}

export default MainContainer;