import Footer from "./components/footer";
import Hero from "./components/hero";
import Bento from "./components/bento";
import Cards from "./components/cards";
import Faqs from "./components/faqs";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex flex-col mx-auto px-6 ">
        <Navbar />
        <div className="mt-32">
          <Hero />
          <Bento />
          <Cards />
          <Faqs />
          <Footer />
        </div>
      </div>
    </>
  );
}
