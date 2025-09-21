type SortValue =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

type Props = {
  value: SortValue;
  onChange: (v: SortValue) => void;
  label?: string;
  className?: string;
};

export default function SortSelect({
  value,
  onChange,
  label = "Sort by",
  className = "",
}: Props) {
  return (
    <div className={className}>
      <label
        htmlFor="sort"
        className="block text-sm font-medium text-[#333333]"
      >
        {label}
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortValue)}
        className="mt-1 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-[#333333] focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="relevance">Relevance</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A–Z</option>
        <option value="name-desc">Name: Z–A</option>
      </select>
    </div>
  );
}
