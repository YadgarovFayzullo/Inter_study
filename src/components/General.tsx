import React from 'react';

export default function General() {
  return (
<div className="w-full h-screen bg-center bg-cover" style={{ backgroundImage: `url('/inter_library.jpg')` }}>
      <div className="w-full h-full bg-black/50 flex items-center justify-center flex-col text-center text-white">
        <p className="text-2xl tracking-widest" style={{ fontFamily: 'Dancing Script, cursive' }}>Scientific journal</p>
        <h1 className="text-7xl font-bold" style={{ fontFamily: 'Dancing Script, cursive' }}>Inter Study</h1>
      </div>
    </div>
  );
}
