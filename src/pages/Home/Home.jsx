import Analytics from "./HomeComponents/Analytics/Analytics";
import DashboardShowcase from "./HomeComponents/DashboardShowcase/DashboardShowcase";
import FAQ from "./HomeComponents/FAQ/FAQ";
import Features from "./HomeComponents/Features/Features";
import FinalCTA from "./HomeComponents/FinalCTA/FinalCTA";
import Hero from "./HomeComponents/Hero/Hero";
import Testimonials from "./HomeComponents/Testimonials/Testimonials";
import WhoItsFor from "./HomeComponents/WhoItsFor/WhoItsFor";
import Workflow from "./HomeComponents/Workflow/Workflow";

const Home = () => {
  return (
    <div>
      <Hero />
      <Workflow />
      <Features />
      <WhoItsFor />
      <DashboardShowcase />
      <Analytics />
      <Testimonials />
      <FinalCTA />
      <FAQ />
    </div>
  );
};

export default Home;