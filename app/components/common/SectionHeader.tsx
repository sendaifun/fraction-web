const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
  return (
    <div className="flex flex-col gap-1 items-center justify-center max-w-2xl mx-auto">
      <p className="text-white text-4xl md:text-[48px] font-polysans text-center">
        {title}
      </p>
      <p className="text-white/80 text-sm md:text-lg max-w-2xl text-center font-polysans">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
