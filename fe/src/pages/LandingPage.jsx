import Articles from "../components/articles";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "./../components/Services";
import Footer from "../components/Footer";
import { WaveDown, WaveUp } from "../components/Wave";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Services />
        <Articles />
      </main>
      <WaveDown />

      <Footer />
    </>
  );
}
