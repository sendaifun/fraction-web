const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <p className="text-white text-4xl  font-polysans text-center">
        {title}
      </p>
      <p className="text-white text-md max-w-2xl text-center font-polysans">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
