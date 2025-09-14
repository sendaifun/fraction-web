import AnimatedBackground from "../components/common/AnimatedBackground";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Bento from "../components/bento";
import Cards from "../components/cards";
import Faqs from "../components/faqs";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex flex-col relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <Navbar />
          <div className="mt-48">
            <Hero />
            <Bento />
            <Cards />
            <Faqs />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
