import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
