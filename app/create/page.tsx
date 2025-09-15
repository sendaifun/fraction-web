import Image from "next/image";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Split from "../components/split";

export default function AppPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col mx-auto px-2 sm:px-6">
        <Navbar />
        <div className="mt-32 relative">
          <Split />

          {/* Halo gradient overlay */}
          <div className="absolute inset-0 -left-120 overflow-hidden pointer-events-none z-10 flex items-center justify-center">
            <Image
              width={1259}
              height={812}
              src="/assets/bgs/halograd.svg"
              alt=""
              className="w-full h-auto opacity-60"
            />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
