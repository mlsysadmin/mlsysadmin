import SupportNavigation from "./custom/custom.NavigationComponent";
import SecondNavigationComponent from "./layout/SecondNavigationComponent";
import Footer from "./layout/FooterComponent";
import ListingDetailsLayout from "./layout/ListingDetailsLayout";
const SupportDashboardComponent = () => {
  return (
    <div className="SupportCreateListingDiv">
      <SupportNavigation
        navigationActive="listing-masterlist"
        whatIsListingStatus="open"
      />
      <SecondNavigationComponent
        title="Manage Open Listings"
        text="These is Manage Listing Page!"
        isCreateListing={false}
      />
      <Footer />
    </div>
  );
};
export default SupportDashboardComponent;
