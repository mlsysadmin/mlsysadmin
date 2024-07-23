import SupportNavigation from "../custom/support/custom.NavigationComponent";
import Footer from "../layout/support/FooterComponent";
import SecondNavigationComponent from "../layout/support/SecondNavigationComponent";
import ListingDetailsLayout from "../layout/support/ListingDetailsLayout";
const SupportCreateListingComponent = () => {
  const navLinks = [
    {
      text: "Create listing",
      to: "/ML-Brokerage/Support/SupportCreateListingPage",
    },
    {
      text: "Listing Masterlist",
      dropdown: true,
      options: [
        { text: "Pending Listings", to: "/ML-Brokerage/Support/pending" },
        { text: "Active Listings", to: "/ML-Brokerage/Support/active" },
        {
          text: "Denied Listings",
          to: "/ML-Brokerage/Support/disapproved",
        },
      ],
    },
    {
      text: "Application Review",
      dropdown: true,
      options: [
        {
          text: "Pending Applications",
          to: "/ML-Brokerage/Support/pendingApplication",
        },
        {
          text: "Approved Applications",
          to: "/ML-Brokerage/Support/openApplication",
        },
        {
          text: "Denied Applications",
          to: "/dashboard/Support/disapprovedApplication",
        },
        {
          text: "Canceled Applications",
          to: "/dashboard/Support/CanceledApplications",
        },
        {
          text: "Closed Applications ",
          to: "/dashboard/Support/ClosedApplications",
        },
      ],
    },
    {
      text: "Pre-Approved Request",
      to: "/ML-Brokerage/Support/pre-approved",
    },
    { text: "Client Management", to: "/ML-Brokerage/Support/SupportDashboard" },
  ];

  return (
    <div className="SupportCreateListingDiv">
      <SupportNavigation navLinkProps={navLinks} />

      <SecondNavigationComponent
        title="Create Listing"
        text="These is Create Listing Page!"
        isCreateListing={true}
      />
      <ListingDetailsLayout />
      <Footer />
    </div>
  );
};
export default SupportCreateListingComponent;
