import React, { useEffect, useState, useRef } from "react";

interface BrutalistCounterProps {
  end: number;
  duration?: number; // default 2000ms
  prefix?: string;
  suffix?: string;
}

export const BrutalistCounter: React.FC<BrutalistCounterProps> = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}) => {
  const [value, setValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // ease-out-expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setValue(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    requestAnimationFrame(step);
  }, [isStarted, end, duration]);

  // Handle format with leading 0 for single digit
  const formatValue = (val: number) => {
    if (val < 10 && end < 100) {
      return `0${val}`;
    }
    return val.toString();
  };

  return (
    <span ref={containerRef} className="font-mono tabular-nums">
      {prefix}
      {formatValue(value)}
      {suffix}
    </span>
  );
};
