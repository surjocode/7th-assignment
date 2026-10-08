"use client";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="flex w-full items-center justify-end gap-3">
      <label
        htmlFor="sort"
        className="shrink-0 text-xs font-medium text-[#6B7280]"
      >
        সাজান
      </label>

      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-36 cursor-pointer rounded-lg border border-[#E2E8E4] bg-white px-3 py-2 text-xs text-[#374151] outline-none transition hover:border-[#008F3C] focus:border-[#008F3C] focus:ring-2 focus:ring-[#008F3C]/10 sm:w-40"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-low">টাকা কম → বেশি</option>
        <option value="price-high">টাকা বেশি → কম</option>
      </select>
    </div>
  );
};

export default SortDropdown;
