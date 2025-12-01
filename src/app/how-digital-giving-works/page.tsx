import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Treasury from "@/components/Treasury";

export default function Home() {
  return (
    <div className="">
      <Hero
        heading="HOW U4C "
        heading_styled="Works"
        paragraph="We built United4Change to solve the trust problem in charity, by using technology that proves every donation does what it says it will. Giving has never been this transparent or borderless"
      />

      <HowItWorks />
      <Treasury />
    </div>
  );
}
