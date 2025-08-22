import ContactUs from "../home/ContactUs";
import ContactUsBanner from "./Banner";

const ContactUsMain = () => {
  return (
    <div className="container px-4 mx-auto my-12">
      <ContactUsBanner />
      <ContactUs />
    </div>
  );
};

export default ContactUsMain;
