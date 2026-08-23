import React, { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  speed?: number; // default 30ms
  delay?: number;
  triggerOnScroll?: boolean;
}

export const BrutalistTypewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 30,
  delay = 0,
  triggerOnScroll = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isStarted, setIsStarted] = useState(!triggerOnScroll);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!triggerOnScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnScroll]);

  useEffect(() => {
    if (!isStarted) return;

    let idx = 0;
    let timer: NodeJS.Timeout;

    const startTyping = () => {
      timer = setInterval(() => {
        setDisplayedText((prev) => {
          if (idx >= text.length) {
            clearInterval(timer);
            return text;
          }
          return text.substring(0, idx + 1);
        });
        idx++;
      }, speed);
    };

    const delayTimer = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [isStarted, text, speed, delay]);

  return (
    <span ref={containerRef} className="font-mono inline-block">
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-[6px] h-3 ml-0.5 bg-[#0085CA] animate-[blink_1s_step-end_infinite]" />
      )}
    </span>
  );
};
