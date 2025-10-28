import Articles from "../components/articles";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "./../components/Services";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="h-screen">
        <Hero />
        <Services />
        <Articles />
      </main>
    </>
  );
}
