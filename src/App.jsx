/* eslint-disable no-unreachable */
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import '@src/scss/style.scss';
import UiKit from '@src/components/views/UiKit';
import NotFound from '@src/components/views/NotFound';
import Home from '@src/components/views/Home';
import Dashboard from '@src/components/views/Dashboard';
import Clients from '@src/components/views/Clients';
import PublicRoutes from '@src/components/global/PublicRoutes';
import PrivateRoutes from '@src/components/global/PrivateRoutes';
import Navigation from '@src/components/global/Navigation';
import AppWrapper from './components/global/AppWrapper';
import Alert from './components/global/Alert';

function App() {
  return (
    <>
      <Alert />
      <Router>
        <Routes>
          <Route element={<AppWrapper />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ui-kit" element={<UiKit />} />

            <Route element={<PrivateRoutes />}>
              <Route element={<><Navigation /><Outlet /></>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/loans" element={<div className="p-24"><h2>Loans - Coming Soon</h2></div>} />
                <Route path="/documents" element={<div className="p-24"><h2>Documents - Coming Soon</h2></div>} />
                <Route path="/transactions" element={<div className="p-24"><h2>Transactions - Coming Soon</h2></div>} />
                <Route path="/reports" element={<div className="p-24"><h2>Reports - Coming Soon</h2></div>} />
                <Route path="/relationship-managers" element={<div className="p-24"><h2>Relationship Managers - Coming Soon</h2></div>} />
                <Route path="/profile" element={<div className="p-24"><h2>Profile - Coming Soon</h2></div>} />
                <Route path="/settings" element={<div className="p-24"><h2>Settings - Coming Soon</h2></div>} />
              </Route>
            </Route>

            <Route element={<PublicRoutes />}>
              <Route path="/public" element={<h1>Public Route</h1>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
