import Hero from "../components/Hero";
import WhoThisIsFor from "../components/WhoThisIsFor";
import Ticker from "../components/Ticker";
import ProfitableExplainer from "../components/ProfitableExplainer";
import Testimonials from "../components/Testimonials";
import StrategyVsAutomation from "../components/StrategyVsAutomation";
import FounderSection from "../components/FounderSection";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ticker />
      <WhoThisIsFor />
      <ProfitableExplainer />
      <Testimonials />
      <StrategyVsAutomation />
      <FounderSection />
      <HowItWorks />
      <Pricing compact />
      <FAQ />
      <CTA />
    </main>
  );
}
