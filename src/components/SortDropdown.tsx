"use client";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({
  value,
  onChange,
}: SortDropdownProps) => {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort"
        className="text-sm font-medium text-[#6b7280]"
      >
        সাজান:
      </label>

      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[#dfe7e2] bg-white px-3 py-2 text-sm text-[#374151] outline-none transition focus:border-[#008f3c] focus:ring-2 focus:ring-[#008f3c]/10"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-low">দাম: কম → বেশি</option>
        <option value="price-high">দাম: বেশি → কম</option>
        <option value="change-high">দাম বৃদ্ধি: বেশি → কম</option>
        <option value="change-low">দাম বৃদ্ধি: কম → বেশি</option>
        <option value="name">নাম: অ → ঔ</option>
      </select>
    </div>
  );
};

export default SortDropdown;