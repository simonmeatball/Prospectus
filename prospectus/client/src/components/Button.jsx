import React from "react";
import { CheckIcon } from 'lucide-react'

function Button() {
  return (
    <button class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 font-sans">
      Sign Up
      <CheckIcon />
    </button>
  );
}

export default Button;