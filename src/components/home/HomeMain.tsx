import AboutUs from "./AboutUs";
import Banner from "./Banner";
import ContactUs from "./ContactUs";
import CustomerFeedback from "./CustomerFeedback";
import ServiceHighlights from "./ServiceHighlight";
import SpecialOffers from "./SpecialOffers";

const HomeMain = () => {
  return (
    <div className="container px-4 mx-auto py-6">
      <Banner />
      <AboutUs />
      <ServiceHighlights />
      <CustomerFeedback />
      <SpecialOffers />
      <ContactUs />
    </div>
  );
};

export default HomeMain;
