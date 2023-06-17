import React from "react";
import toast from "react-hot-toast";

export default function Copy({ text }: { text: string | null }) {
  const copy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast("Copied to clipboard!", {
        icon: "📋",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  return (
    <div className="ml-2 hover:cursor-pointer" onClick={copy}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 22 22"
        fill="none"
      >
        <path
          d="M7 7V5C7 2.79086 8.79086 1 11 1L17 1C19.2091 1 21 2.79086 21 5V11C21 13.2091 19.2091 15 17 15H15M7 7H5C2.79086 7 1 8.79086 1 11V17C1 19.2091 2.79086 21 5 21H11C13.2091 21 15 19.2091 15 17V15M7 7H11C13.2091 7 15 8.79086 15 11V15"
          stroke="white"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}
