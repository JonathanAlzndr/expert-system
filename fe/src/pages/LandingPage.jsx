import Articles from "../components/articles";
import Hero from "../components/Hero";
import Services from "./../components/Services";
import Footer from "../components/Footer";
import { WaveDown } from "../components/Wave";

export default function LandingPage() {
  return (
    <>
      <section className="">
        <Hero />
        <Articles />
      </section>
      <WaveDown />

      <Footer />
    </>
  );
}
