import SectionHeader from "./common/SectionHeader";
import Input from "./common/Input";

const Split = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Create your own Fractions"
          subtitle="Fraction is a Solana program that splits all incoming SPL tokens (eg. USDC) among the recipients according to the allocated % shares."
        />

        <div className="flex flex-col max-w-4xl mx-auto gap-4">
          <Input
            className="w-full max-w-md"
            label="Fraction Name"
            placeholder="Enter Contract Name"
          />
          <Input
            className="w-full max-w-md"
            placeholder="Enter Contract Name"
          />
          <Input
            className="w-full max-w-md"
            placeholder="Enter Contract Name"
          />
          <Input
            className="w-full max-w-md"
            placeholder="Enter Contract Name"
          />
        </div>
        <div className="flex max-w-4xl mx-auto gap-4">
          <Input
            className="flex-1"
            label="Fraction Name"
            placeholder="Enter Contract Name"
          />
          <Input  
            className="flex-1"
            label="Upgrader"
            placeholder="None (immutable)"
          />
        </div>
        
      </div>
    </>
  );
};

export default Split;
