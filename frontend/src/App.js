import './App.css';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './router/AppRouter';


// import Sidebar from './components/MY Drafts/Components/SidebarComponent';
// import ListingsTable from './components/MY Drafts/Components/ListingsTableComponent';
// import Drafts from './components/MY Drafts/Drafts';
// import Footer from './components/MY Drafts/Components/FooterComponent';
// import ActiveInactive from './components/MY Drafts/Active-Inactive';
// import Soldproperties from './components/MY Drafts/Soldproperties';
// import ListingsApproval from './components/MY Drafts/ListingsApproval';
// import ClientManagement from './components/MY Drafts/ClientManagement';
// // import Try from './components/try';
// // import RegistrationFormModal from './components/Modals/RegistrationModal';
// import ModalComponents from './components/Modals/ModalComponents';
// import ListingForm from './components/ListingFormsample/ListingForm';
// import LoginModal from './components/Modals/LoginModal';
// import RegistrationModal from './components/Modals/RegistrationModal';
// import PreviewListing from './components/PreviewListing/previewListing';
// // import PreviewListingcalculator from './components/PreviewListing/previewListing.calculator';


function App() {
  return (
    <div className='App'>
      <RouterProvider router={AppRouter}/>
    </div>
  );
}

export default App;