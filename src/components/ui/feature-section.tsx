"use client";

import React, { useState, useEffect } from "react";

interface Feature {
  step: string;
  title: string;
  content: string;
  image: string;
}

interface FeatureStepsProps {
  features: Feature[];
  title: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

export function FeatureSteps({
  features,
  title,
  autoPlayInterval = 5000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [features.length, autoPlayInterval]);

  const current = features[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-8 md:px-12 w-full">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-white">
        {title}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className={`${imageHeight} rounded-2xl overflow-hidden border border-slate-800/50`}>
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div className="text-6xl md:text-7xl font-bold text-emerald-400/20">
            {current.step}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            {current.title}
          </h3>
          <p className="text-slate-400 leading-relaxed text-lg">
            {current.content}
          </p>

          {/* Navigation Dots */}
          <div className="flex gap-3 pt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-emerald-400"
                    : "w-2 bg-slate-600 hover:bg-slate-500"
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}