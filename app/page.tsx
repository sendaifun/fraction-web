import Footer from "./components/footer";
import Hero from "./components/hero";
import Bento from "./components/bento";
import Cards from "./components/cards";
import Faqs from "./components/faqs";
import Navbar from "./components/navbar";
import ScrollAnimatedBg from "./components/common/ScrollAnimatedBg";

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex flex-col mx-auto px-2 sm:px-6 relative">
        <ScrollAnimatedBg />
        <Navbar />
        <div className="mt-32 lg:mt-48 relative z-10">
          <Hero />
          <Bento />

          <Cards />
          <Faqs />
          <div
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-3/4 w-[400px] h-[200px] bg-[#1355A6]/50 rounded-full blur-[224px]"
            style={{ willChange: "transform" }}
          />
          <div
            className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1355A6]/50 rounded-full blur-[624px]"
            style={{ willChange: "transform" }}
          />
          <Footer />
        </div>
      </div>
    </>
  );
}
