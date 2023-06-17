import React from "react";
import Select from "react-select";
export default function Input({
  placeholder,
  onChange,
  label,
  data,
}: {
  placeholder: string;
  onChange: (e: any) => void;
  label: string;
  data: { value: string; label: string }[];
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-regular text-zinc-500">
        {label}:
      </label>
      <div className="mt-2">
        <Select
          options={data}
          styles={{
            control: (base, state) => ({
              ...base,
              background: "#151718",
              color: "#fff",
              borderRadius: 7,
              borderWidth: 1,
              borderColor: state.isFocused ? "#00EB89" : "#27272a",
              padding: 3,
            }),
            menu: (base) => ({
              ...base,
              borderRadius: 0,
              marginTop: 0,
              color: "#fff",
            }),
            menuList: (base) => ({
              ...base,
              background: "#151718",
              padding: 0,
              color: "#fff",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              svg: {
                fill: "#71717a",
              },
            }),
            option: () => ({
              background: "#151718",
              padding: 10,
              "&:hover": {
                background: "#27272a",
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "white",
            }),
          }}
          placeholder={placeholder}
          components={{
            IndicatorSeparator: () => null,
          }}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
