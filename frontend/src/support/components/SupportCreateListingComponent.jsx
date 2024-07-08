import SupportNavigation from "./custom/custom.NavigationComponent";
import SecondNavigationComponent from "./layout/SecondNavigationComponent";
import Footer from "./layout/FooterComponent";
import ListingDetailsLayout from "./layout/ListingDetailsLayout";
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
        { text: "Open Listings", to: "/ML-Brokerage/Support/open" },
        { text: "Pending Listings", to: "/ML-Brokerage/Support/pending" },
        { text: "Active Listings", to: "/ML-Brokerage/Support/active" },
        {
          text: "Disapproved Listings",
          to: "/ML-Brokerage/Support/disapproved",
        },
      ],
    },
    {
      text: "Application Review",
      dropdown: true,
      options: [
        {
          text: "Open Applications",
          to: "/ML-Brokerage/Support/openApplication",
        },
        {
          text: "Pending Applications",
          to: "/ML-Brokerage/Support/pendingApplication",
        },
        {
          text: "Denied Applications",
          to: "/dashboard/Support/disapprovedApplication",
        },
        {
          text: "Canceled Applications",
          to: "/dashboard/Support/CanceledApplications ",
        },
        {
          text: "Closed Applications ",
          to: "/dashboard/Support/ClosedApplications  ",
        },
      ],
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
