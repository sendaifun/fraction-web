'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How much is the fees and till when its charged?",
    answer: "We're working on providing you with the most accurate and detailed information. Please check back soon as this section will be updated shortly with all the answers you need!"
  },
  {
    question: "What are Fractions and how do they work?",
    answer: "We're working on providing you with the most accurate and detailed information. Please check back soon as this section will be updated shortly with all the answers you need!"
  },
  {
    question: "How secure is the platform?",
    answer: "We're working on providing you with the most accurate and detailed information. Please check back soon as this section will be updated shortly with all the answers you need!"
  },
  {
    question: "Can I trade my fractions with other users?",
    answer: "We're working on providing you with the most accurate and detailed information. Please check back soon as this section will be updated shortly with all the answers you need!"
  },
  {
    question: "What happens if the underlying asset value changes?",
    answer: "We're working on providing you with the most accurate and detailed information. Please check back soon as this section will be updated shortly with all the answers you need!"
  }
];

const AccordionItem = ({ item, isOpen, onClick }: { 
  item: FAQItem; 
  isOpen: boolean; 
  onClick: () => void;
}) => {
  return (
    <div className="border border-white/10 rounded-xl p-6 backdrop-blur-sm">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-200 rounded-xl"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-white font-polysans text-lg pr-4">
          {item.question}
        </span>
        <div className="flex-shrink-0">
          <svg
            className={`w-5 h-5 text-white transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4">
          <p className="text-white/80 font-polysans leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="flex flex-col gap-16 items-center justify-center max-w-7xl mx-auto p-4 mt-16">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-white text-4xl max-w-2xl font-polysans text-center">
            Frequently Asked Questions
          </p>
          <p className="text-white text-md font-polysans">
            Everything you need to know about Fractions
          </p>
        </div>

        <div className="w-full max-w-7xl flex flex-col gap-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Faqs;
