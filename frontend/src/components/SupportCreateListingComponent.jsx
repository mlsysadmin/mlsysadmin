import SupportNavigation from "./custom/custom.NavigationComponent";
import SecondNavigationComponent from "./layout/SecondNavigationComponent";
import Footer from "./layout/FooterComponent";
import ListingDetailsLayout from "./layout/ListingDetailsLayout";
const SupportDashboardComponent = () => {
  return (
    <div className="SupportCreateListingDiv">
      <SupportNavigation
        navigationActive="create-listing"
        whatIsListingStatus="none"
      />
      <SecondNavigationComponent title="Create Listing" text="These is Create Listing Page!" isCreateListing={true}/>
      <ListingDetailsLayout />
      <Footer />
    </div>
  );
};
export default SupportDashboardComponent;
