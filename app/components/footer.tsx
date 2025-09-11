import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-32 relative">
      <div className=" max-w-7xl mx-auto px-6">
        <p className="text-white/50 text-sm leading-relaxed text-left">
          SendAI Fraction is just a visual interface on Fraction with all
          non-custodial, transfer, and trading services powered by third party
          services like Jupiter, Birdeye, Privy, and more.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 pt-4">
        <div className="flex flex-col border-t border-white/10 pt-12">
          {/* Social Icons */}
          <div className="flex gap-4 mb-6">
            <a
              href="https://x.com/sendaifun"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/assets/icons/x.svg"
                alt="X (Twitter)"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://github.com/sendaifun/fraction"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/assets/icons/github.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
            </a>
          </div>

          {/* Text content in single line */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/50 gap-4 md:gap-0">
            <p className="text-center md:text-left">
              Twenty&apos;25 SendAI © All Rights Reserved
            </p>
            <div className="flex items-center">
              <a href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <span className="mx-2">|</span>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Abstract background */}
      <div className=" max-w-7xl mx-auto bottom-0 left-0 right-0 pointer-events-none">
        <Image
          src="/assets/bgs/footerabs.svg"
          alt=""
          width={1920}
          height={400}
          className="w-full object-cover"
        />
      </div>
    </footer>
  );
}
