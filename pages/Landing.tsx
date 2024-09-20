import Hero from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import React from 'react';

const Landing = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Landing;
