import Categories from "@/components/Categories";
import FAQs from "@/components/FAQs";
import FundProject from "@/components/FundProject";
import Hero from "@/components/Hero";
import PopularCampaign from "@/components/PopularCampaign";
import Steps from "@/components/Steps";
import Video from "@/components/Video";
import WhyUs from "@/components/WhyUs";

const steps_0 = [
  {
    heading: "Funds protected in Smart Vault",
    paragraph:
      "Your funds go into a blockchain-powered vault released only when verified milestones are met.",
  },
  {
    heading: "Choose Your Project",
    paragraph: "Explore verified, community-led campaigns",
  },
  {
    heading: "Track Your Impact",
    paragraph:
      "Watch projects progress, get updates, and receive a full impact report.",
  },
  {
    heading: "Donate Using Digital Cash or Card",
    paragraph:
      "Accepting USDC, USDT, or bank card in your local currency. Every donation is secure and borderless.",
  },
];

const steps_1 = [
  {
    heading: "Create Your Project",
    paragraph:
      "Set your funding goal and break it into clear, achievable milestones, add photos/videos and personalize your story.",
  },
  {
    heading: "Register Your Account",
    paragraph: "Sign up in seconds with your name and email to get started.",
  },
  {
    heading: "Share and Raise Funds",
    paragraph:
      "Promote your project with a link. Donors can support instantly using digital cash or card. Every donation is secure and transparent.",
  },
  {
    heading: "Track and Withdraw",
    paragraph:
      "See donations live on your dashboard. Withdraw your funds when milestones are reached.",
  },
];

export default function Home() {
  return (
    <div className="">
      <Hero
        heading="Your Trust, Their "
        heading_styled="Future"
        paragraph="United4Change (U4C) is a blockchain-powered donation platform that connects verified NGOs with global donors. Every campaign is milestone-based, every transaction is on-chain, and every donor sees exactly how their contribution creates impact."
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
      {/* <Steps
        heading="Fund A Project in 4 Easy Steps"
        subheading="Your funds go into a blockchain-powered vault released only when verified milestones are met."
        steps={steps_0}
        first={false}
      /> */}
      <FundProject />
      <WhyUs />
      <FAQs title={true} />
    </div>
  );
}
