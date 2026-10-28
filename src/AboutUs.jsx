import React from 'react';
import { ArrowUpRight, Leaf } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="about-section" id="about">
      <div className="about-mark" aria-hidden="true"><Leaf size={27} strokeWidth={1.5} /></div>
      <div>
        <p className="eyebrow">A little more green, every day</p>
        <h2>Good plants.<br />Good growing.</h2>
      </div>
      <div className="about-copy">
        <p>Paradise Nursery is a small, plant-loving team bringing thoughtfully grown greenery to the places we call home. We choose resilient favorites, pack them with care, and help you find the right plant for your kind of light.</p>
        <a href="mailto:hello@paradisenursery.example">Meet your plant people <ArrowUpRight size={16} /></a>
      </div>
    </section>
  );
}