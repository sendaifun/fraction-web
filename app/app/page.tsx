import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Split from "../components/split";

export default function AppPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col mx-auto px-6 bg-black">
        <Navbar />
        <div className="mt-32">
          <Split />

          <Footer />
        </div>
      </div>
    </>
  );
}
