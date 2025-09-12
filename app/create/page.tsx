import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Split from "../components/split";

export default function AppPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col mx-auto px-2 sm:px-6">
        <Navbar />
        <div className="mt-32">
          <Split />

          <Footer />
        </div>
      </div>
    </>
  );
}
