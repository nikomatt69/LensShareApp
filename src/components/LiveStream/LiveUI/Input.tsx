import React from "react";

export default function Input({
  placeholder,
  onChange,
  label,
  disabled,
  type,
}: {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  disabled?: boolean;
  type?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-regular text-zinc-500">
        {label}:
      </label>
      <div className="mt-2">
        <input
          className="w-full px-3 py-2.5 text-gray-200 bg-[#151718] border border-zinc-800 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent placeholder-gray-400"
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          type={type || "text"}
        />
      </div>
    </div>
  );
}
