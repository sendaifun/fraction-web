"use client";

import Image from "next/image";
import { motion } from "motion/react";
import SectionHeader from "./common/SectionHeader";

const Cards = () => {
  const cards = [
    {
      icon: "/assets/icons/chart.svg",
      title: "Consumer",
      subtitle:
        "Power apps with subscriptions, payroll, and instant revenue splits.",
    },
    {
      icon: "/assets/icons/chart.svg",
      title: "Agents",
      subtitle:
        "On-chain bots that execute transfers, manage treasuries, and enforce rules.",
    },
    {
      icon: "/assets/icons/thunder.svg",
      title: "Launchpads",
      subtitle:
        "Automate token sale proceeds, vesting schedules, and treasury allocations.",
    },
    {
      icon: "/assets/icons/chart.svg",
      title: "Move Money",
      subtitle:
        "On-chain rails for instant payments, atomic settlements, and recurring flows.",
    },
  ];

  return (
    <>
      <motion.div 
        className="flex flex-col gap-16 items-center justify-center max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <SectionHeader
            title="Built for agentic workflows and consumer apps"
            subtitle="Real-world workflows developers can launch in minutes."
          />
        </motion.div>

        <div className="flex flex-col gap-8 m-2 md:flex-row">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              style={{ borderWidth: "0.5px" }}
              className="bg-black/20 border border-[#585858] rounded-lg p-6 hover:border-[#585858] transition-colors duration-300"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + (index * 0.1), 
                ease: "easeOut" 
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -5, 
                transition: { duration: 0.2 } 
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex-shrink-0">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={46}
                      height={46}
                      className="opacity-80"
                    />
                  </div>
                  <h3 className="text-white text-xl font-polysans font-medium">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-polysans leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Cards;
