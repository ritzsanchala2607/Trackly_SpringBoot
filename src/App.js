import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, ThemeSettings,AntTable } from './components';
import {
  EmpDashboard, Ecommerce, MarketingAgency, AddLeads, AddEmployee,LeadsTable,
  Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban,
  Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor
} from './pages';


import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Login';
import LeadDetail from './pages/LeadDetail';

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {/* Settings button */}
          <div className="fixed right-4 bottom-4 z-[1000]">
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* Main Content without Sidebar */}
          <div className="dark:bg-main-dark-bg bg-main-bg w-full min-h-screen">
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            {/* Theme Settings Modal */}
            {themeSettings && <ThemeSettings />}

            {/* Routes */}
            <div>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />
                <Route path="/empdashboard" element={<EmpDashboard />} />

                {/* Pages */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/agency" element={<MarketingAgency />} />
                <Route path="/addlead" element={<AddLeads />} />
                <Route path="/addemployee" element={<AddEmployee />} />
                <Route path="/leaddetails" element={<LeadDetail leadData={selectedLead} />} />
                <Route path="/temptable" element={<LeadsTable />} />
                <Route path="/login" element={<Login />} />

                {/* Apps */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* Charts */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
