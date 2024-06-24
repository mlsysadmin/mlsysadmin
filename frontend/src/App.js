// import logo from './images/';
import './App.css';
// import AppRouter from './router/AppRouter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './components/MY Drafts/Components/SidebarComponent';
import ListingsTable from './components/MY Drafts/Components/ListingsTableComponent';
import Drafts from './components/MY Drafts/Drafts';
import Footer from './components/MY Drafts/Components/FooterComponent';
import ActiveInactive from './components/MY Drafts/Active-Inactive';
import Soldproperties from './components/MY Drafts/Soldproperties';
import ListingsApproval from './components/MY Drafts/ListingsApproval';
import ClientManagement from './components/MY Drafts/ClientManagement';
// import Try from './components/try';
// import RegistrationFormModal from './components/Modals/RegistrationModal';
import ModalComponents from './components/Modals/ModalComponents';
import ListingForm from './components/ListingFormsample/ListingForm';
import LoginModal from './components/Modals/LoginModal';
import RegistrationModal from './components/Modals/RegistrationModal';
import PreviewListing from './components/PreviewListing/previewListing';
// import PreviewListingcalculator from './components/PreviewListing/previewListing.calculator';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          
         
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/listingstable" element={<ListingsTable />} />
          <Route path="/listingsapproval" element= {<ListingsApproval/>}/>
          <Route path="/active-inactive" element={<ActiveInactive />} />
          <Route path="/sold-properties" element={<Soldproperties />} />
          <Route path="/drafts" element={<Drafts/>} />
          <Route path="/footer" element={<Footer/>} />
          <Route path="/clientmanagement" element={<ClientManagement/>} />
          <Route path="/listings" component={ListingsApproval} />
          
          {/* <Route path = "/try" element={<Try/>} /> */}
          <Route path = "/listingForm" element={<ListingForm/>} /> 
          <Route path = "/modalcomponents" element={<ModalComponents/>} />
          <Route path = "/loginModal" element={<LoginModal/>} />
          <Route path = "/registrationModal" element={<RegistrationModal/>} />
          <Route path = "/previewlisting" element={<PreviewListing/>} />
          {/* <Route path = "/previewcalcu" element={<PreviewListingcalculator/>} /> */}
         

        </Routes>
        
      </div>
    </Router>
    
  );
}

export default App;