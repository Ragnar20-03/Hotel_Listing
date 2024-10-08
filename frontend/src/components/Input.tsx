import React, { ChangeEvent } from "react";

type InputProps = {
  text: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ text, onSearch }: InputProps) {
  return (
    <input
      onChange={(e) => {
        onSearch(e);
      }}
      type="text"
      placeholder={`${text}`}
      className={`m-3 p-2 h-10 rounded-lg `}
    />
  );
}

export default Input;
