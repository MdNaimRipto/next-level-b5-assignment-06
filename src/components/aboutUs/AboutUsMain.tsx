import AboutUsBanner from "./Banner";
import CompanyBackground from "./CompanyBackground";
import OurMissions from "./OurMissions";
import OurTeam from "./OurTeam";

const AboutUsMain = () => {
  return (
    <div className="container px-4 mx-auto py-12">
      <AboutUsBanner />
      <CompanyBackground />
      <OurMissions />
      <OurTeam />
    </div>
  );
};

export default AboutUsMain;
