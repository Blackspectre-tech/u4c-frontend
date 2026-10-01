import Analytics from "@/components/Analytics";
import Compar from "@/components/Compar";
import FAQs from "@/components/FAQs";
import FundProject from "@/components/FundProject";
import Institutions from "@/components/Institutions";
import LandingPage from "@/components/LandingPage";
import PopularCampaign from "@/components/PopularCampaign";
import Video from "@/components/Video";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <div className="bg-white">
      <LandingPage
        heading="Funding Real Impact, Not "
        heading_styled="Promises"
        paragraph="A transparent funding platform where donations are released as verified milestones are completed."
        button={true}
      />
      <Video />
      {/* <Categories /> */}
      {/* <Steps
        heading="Fund A Project in 4 Easy Steps"
        subheading="Your funds go into a blockchain-powered vault released only when verified milestones are met."
        steps={steps_1}
      /> */}
      <PopularCampaign />
      {/* <Analytics /> */}
      {/* <Steps
        heading="Fund A Project in 4 Easy Steps"
        subheading="Your funds go into a blockchain-powered vault released only when verified milestones are met."
        steps={steps_0}
        first={false}
      /> */}
      <FundProject />
      <WhyUs />
      <Compar />
      <FAQs title={true} />
      <Institutions />
    </div>
  );
}
