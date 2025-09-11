import Image from "next/image";
import { STROKE_GRAY_1, STROKE_GRAY_2 } from "@/app/lib/constants";

const Bento = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="border" style={{ borderColor: STROKE_GRAY_1 }}>
        {/* Row 1: Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row">
          <div
            className="flex justify-center items-center border p-6 min-h-[300px] flex-1 lg:flex-[0.4]"
            style={{ borderColor: STROKE_GRAY_2 }}
          >
            <Image
              src="/assets/bento/illust1.svg"
              alt="Deposit and split illustration"
              width={400}
              height={300}
              className="w-full max-w-md h-auto max-h-80"
            />
          </div>
          <div
            className="flex flex-col justify-center space-y-4 border p-6 min-h-[300px] flex-1 lg:flex-[0.6]"
            style={{ borderColor: STROKE_GRAY_2 }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Deposit and split transactions
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              When funds are deposited into a shared treasury, an on-chain agent
              executes the distribution, allocating each participant their exact
              fraction (% share) without manual intervention.
            </p>
          </div>
        </div>

        {/* Row 2: Text Left, Image Right */}
        <div className="flex flex-col lg:flex-row">
          <div
            className="flex flex-col justify-center space-y-4 border p-6 min-h-[300px] flex-1 lg:flex-[0.6] order-2 lg:order-1"
            style={{ borderColor: STROKE_GRAY_2 }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Integrate in &lt;10 mins
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Plug in with our TypeScript SDKs and pre-built React components.
              Go from install to live integration in under 10 minutes. A flat
              0.05% protocol fee applies.
            </p>
          </div>
          <div
            className="flex justify-center items-center border p-6 min-h-[300px] flex-1 lg:flex-[0.4] order-1 lg:order-2"
            style={{ borderColor: STROKE_GRAY_2 }}
          >
            <Image
              src="/assets/bento/illust2.svg"
              alt="Integration illustration"
              width={400}
              height={300}
              className="w-full max-w-md h-auto max-h-80"
            />
          </div>
        </div>

        {/* Row 3: Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row">
          <div
            className="flex justify-center items-center border p-6 min-h-[300px] flex-1 lg:flex-[0.4]"
            style={{ borderColor: STROKE_GRAY_2 }}
          >
            <Image
              src="/assets/bento/illust3.svg"
              alt="Trusted and audited illustration"
              width={400}
              height={300}
              className="w-full max-w-md h-auto max-h-80"
            />
          </div>
          <div
            className="flex flex-col justify-center space-y-4 border p-6 min-h-[300px] flex-1 lg:flex-[0.6]"
            style={{ borderColor: STROKE_GRAY_2 }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Trusted, Audited & open-source
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              All contracts are open-source with reproducible builds. Code is
              formally verified and independently audited by Sec3.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bento;
