import Footer from "./components/footer";
import Hero from "./components/hero";
import Bento from "./components/bento";
import Cards from "./components/cards";
import Faqs from "./components/faqs";

export default function Home() {
  return (
    <>
      <div className="w-full h-full mx-auto px-6 bg-red-500">
        <Hero />
        <Bento />
        <Cards />
        <Faqs />
        <Footer />
      </div>
    </>
  );
}