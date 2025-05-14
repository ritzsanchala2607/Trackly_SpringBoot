import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Link } from "react-router-dom";

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData, employeesData, employeesGrid } from '../data/dummy';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';

const DropDown = ({ currentMode }) => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
      <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
    </div>
  );

function MarketingAgency() {
    const { currentColor, currentMode } = useStateContext();
          const toolbarOptions = ['Search'];
        
          const editing = { allowDeleting: true, allowEditing: true };
  return (
    
    <div>
      <div className="mt-7">
        <div className="flex flex-wrap lg:flex-nowrap justify-end gap-x-4 mr-5">
          <Link to="/addlead"><Button color="white" bgColor={currentColor} text="Add Lead" borderRadius="10px" /></Link>
        </div>
        <div className="flex m-3 flex-wrap justify-evenly gap-1 items-center">
            {earningData.map((item) => (
                <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                <button
                    type="button"
                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                    className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                >
                    {item.icon}
                </button>
                <p className="mt-3">
                    <span className="text-lg font-semibold">{item.amount}</span>
                    <span className={`text-sm text-${item.pcColor} ml-2`}>
                    {item.percentage}
                    </span>
                </p>
                <p className="text-sm text-gray-400  mt-1">{item.title}</p>
                </div>
            )).slice(-4)}
        </div>
      <div>
        <LineChart />
            <Stacked />
      </div>
    </div>
    </div>
  )
}

export default MarketingAgency