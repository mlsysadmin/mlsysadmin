// import logo from './images/';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ListingsTable from './components/ListingsTable';
import Drafts from './components/Drafts';
import Footer from './components/Footer';
import ActiveInactive from './components/Active-Inactive';
import Soldproperties from './components/Soldproperties';
import ListingsApproval from './components/ListingsApproval';
import ClientManagement from './components/ClientManagement';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/navbar" element={<Navbar />} /> */}
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/listingstable" element={<ListingsTable />} />
          <Route path="/listingsapproval" element= {<ListingsApproval/>}/>
          <Route path="/active-inactive" element={<ActiveInactive />} />
          <Route path="/sold-properties" element={<Soldproperties />} />
          <Route path="/drafts" element={<Drafts/>} />
          <Route path="/footer" element={<Footer/>} />
          <Route path="/clientmanagement" element={<ClientManagement/>} />
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;