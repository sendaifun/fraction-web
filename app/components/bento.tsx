"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { STROKE_GRAY_1 } from "@/app/lib/constants";

const Bento = () => {
  return (
    <motion.section
      className="py-20 px-0 md:px-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="border"
        style={{ borderColor: STROKE_GRAY_1, borderWidth: "0.1px" }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Row 1: Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row">
          <div
            className="flex justify-center items-center border-[0.1px] p-6 min-h-[300px] flex-1 lg:flex-[0.4] relative"
            style={{
              borderColor: STROKE_GRAY_1,
              borderWidth: "0.1px",
              backgroundImage: "url('/assets/bgs/cardbgpattern.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Image
                src="/assets/bento/illust1.svg"
                alt="Deposit and split illustration"
                width={400}
                height={300}
                className="w-full max-w-md h-auto max-h-80 relative z-10"
              />
            </motion.div>
          </div>
          <div
            className="flex flex-col justify-end space-y-4 border-[0.1px] p-6 min-h-[300px] flex-1 lg:flex-[0.6]"
            style={{ borderColor: STROKE_GRAY_1, borderWidth: "0.1px" }}
          >
            <motion.h3 
              className="text-2xl lg:text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              Deposit and split transactions
            </motion.h3>
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              When funds are deposited into a shared treasury, an on-chain agent
              executes the distribution, allocating each participant their exact
              fraction (% share) without manual intervention.
            </motion.p>
          </div>
        </div>

        {/* Row 2: Text Left, Image Right */}
        <div className="flex flex-col lg:flex-row">
          <div
            className="flex flex-col justify-end space-y-4 border-[0.1px] p-6 min-h-[300px] flex-1 lg:flex-[0.6] order-2 lg:order-1"
            style={{ borderColor: STROKE_GRAY_1, borderWidth: "0.1px" }}
          >
            <motion.h3 
              className="text-2xl lg:text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              Integrate in &lt;10 mins
            </motion.h3>
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              Plug in with our TypeScript SDKs and pre-built React components.
              Go from install to live integration in under 10 minutes. A flat
              0.05% protocol fee applies.
            </motion.p>
          </div>
          <div
            className="flex justify-center items-center border-[0.1px] p-6 min-h-[300px] flex-1 lg:flex-[0.4] order-1 lg:order-2 relative"
            style={{
              borderColor: STROKE_GRAY_1,
              borderWidth: "0.1px",
              backgroundImage: "url('/assets/bgs/cardbgpattern.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Image
                src="/assets/bento/illust2.svg"
                alt="Integration illustration"
                width={400}
                height={300}
                className="w-full max-w-md h-auto max-h-80 relative z-10"
              />
            </motion.div>
          </div>
            </div>

        {/* Row 3: Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row">
          <div
            className="flex justify-center items-center border-[0.1px] p-6 min-h-[300px] flex-1 lg:flex-[0.4] relative"
            style={{
              borderColor: STROKE_GRAY_1,
              backgroundImage: "url('/assets/bgs/cardbgpattern.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Image
                src="/assets/bento/illust3.svg"
                alt="Trusted and audited illustration"
                width={400}
                height={300}
                className="w-full max-w-md h-auto max-h-80 relative z-10"
              />
            </motion.div>
          </div>
          <div
            className="flex flex-col justify-end space-y-4 border-[0.1px] p-6 min-h-[300px] flex-1 lg:flex-[0.6]"
            style={{ borderColor: STROKE_GRAY_1, borderWidth: "0.1px" }}
          >
            <motion.h3 
              className="text-2xl lg:text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              Trusted, Audited & open-source
            </motion.h3>
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              All contracts are open-source with reproducible builds. Code is
              formally verified and independently audited by Sec3.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Bento;
