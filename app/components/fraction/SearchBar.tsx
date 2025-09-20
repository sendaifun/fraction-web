import Input from "../common/Input";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="w-full mb-8 px-4">
      <Input
        className="w-full"
        placeholder="Search your fraction.."
        value={searchQuery}
        onChange={onSearchChange}
        icon="/assets/icons/search.svg"
      />
    </div>
  );
}
