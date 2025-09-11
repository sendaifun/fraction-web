import Image from "next/image";
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
      <div className="flex flex-col gap-16 items-center justify-center max-w-7xl mx-auto">
        <SectionHeader
          title="Built for agentic workflows and consumer apps"
          subtitle="Real-world workflows developers can launch in minutes."
        />

        <div className="flex flex-col gap-8 m-2 md:flex-row">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-black/20 border border-gray-800/50 rounded-lg p-6 hover:border-gray-700/50 transition-colors duration-300"
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
