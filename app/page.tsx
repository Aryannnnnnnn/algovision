import HomeHero from "./components/home/HomeHero";
import ServicesOverview from "./components/home/ServicesOverview";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HomeHero />
      <ServicesOverview />
    </div>
  );
}
