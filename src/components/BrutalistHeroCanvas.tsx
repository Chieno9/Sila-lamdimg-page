import React, { useRef, useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  opacity: number;
  // For shockwave offset
  offsetX: number;
  offsetY: number;
  springVx: number;
  springVy: number;
}

export const BrutalistHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resizeCanvas = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);

    // Dynamic count based on device rules (200 on desktop, 80 on mobile)
    const particleCount = isMobile ? 80 : 200;
    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const vx = (Math.random() - 0.5) * 0.4;
      const vy = (Math.random() - 0.5) * 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: 0,
        targetY: 0,
        vx: vx,
        vy: vy,
        baseVx: vx,
        baseVy: vy,
        opacity: Math.random() * 0.3 + 0.25, // White 0.4 avg
        offsetX: 0,
        offsetY: 0,
        springVx: 0,
        springVy: 0,
      });
    }

    // Ripple source params
    let ripple: { x: number; y: number; radius: number; progress: number; maxRadius: number } | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      cursorRef.current = { x: -1000, y: -1000 };
    };

    const handleClick = (e: MouseEvent) => {
      // Trigger a shockwave ripple push and pull with spring mechanics
      ripple = {
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        progress: 0,
        maxRadius: 280,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    const connectionLimit = 120;

    const drawDiamond = (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) => {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 2.2;

      // Symmetric diamond path (rotated square)
      ctx.moveTo(cx, cy - size);
      ctx.lineTo(cx + size, cy);
      ctx.lineTo(cx, cy + size);
      ctx.lineTo(cx - size, cy);

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Handle ripple animation
      if (ripple) {
        ripple.progress += 0.05;
        ripple.radius = ripple.maxRadius * Math.sin(ripple.progress * Math.PI * 0.5);
        if (ripple.progress >= 1) {
          ripple = null;
        }
      }

      // 1. Move and update particles
      const cursor = cursorRef.current;
      particles.forEach((p) => {
        // Slow drift
        p.x += p.vx;
        p.y += p.vy;

        // Wall padding bounce
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > height) { p.y = height; p.vy *= -1; }

        // Spring feedback for offset (ripple restoration)
        // If there's offset, push back with spring mechanics
        if (p.offsetX !== 0 || p.offsetY !== 0) {
          const k = 0.07; // stiffness
          const d = 0.85; // damping
          p.springVx += -p.offsetX * k;
          p.springVy += -p.offsetY * k;
          p.springVx *= d;
          p.springVy *= d;
          p.offsetX += p.springVx;
          p.offsetY += p.springVy;
        }

        // Apply shockwave force if ripple is active
        if (ripple) {
          const dx = (p.x + p.offsetX) - ripple.x;
          const dy = (p.y + p.offsetY) - ripple.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceDist = ripple.radius;

          if (Math.abs(dist - forceDist) < 40) {
            // Push outwards based on push strength
            const pushFactor = (40 - Math.abs(dist - forceDist)) / 40;
            const angle = Math.atan2(dy, dx);
            const force = pushFactor * 45;
            p.offsetX += Math.cos(angle) * force;
            p.offsetY += Math.sin(angle) * force;
          }
        }

        // Magnetic cursor pull - gather particles and speed up slightly on hover
        if (cursor.x >= 0 && cursor.y >= 0) {
          const curX = p.x + p.offsetX;
          const curY = p.y + p.offsetY;
          const dx = cursor.x - curX;
          const dy = cursor.y - curY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pullRange = 160;

          if (dist < pullRange) {
            const pullFactor = (1 - dist / pullRange);
            const pullStrength = pullFactor * 0.18; // organic spring pull
            p.vx += (dx / dist) * pullStrength;
            p.vy += (dy / dist) * pullStrength;
            // Cap velocities to keep drift fluid and avoid escaping
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > 1.8) {
              p.vx = (p.vx / speed) * 1.8;
              p.vy = (p.vy / speed) * 1.8;
            }
          } else {
            // Smoothly restore default slow drift kinetics
            p.vx += (p.baseVx - p.vx) * 0.04;
            p.vy += (p.baseVy - p.vy) * 0.04;
          }
        } else {
          // Restore default idle speed
          p.vx += (p.baseVx - p.vx) * 0.04;
          p.vy += (p.baseVy - p.vy) * 0.04;
        }
      });

      // 2. Find closest particle to cursor
      let nearestIdx = -1;
      let minCursorDist = Infinity;

      if (cursor.x >= 0 && cursor.y >= 0) {
        particles.forEach((p, idx) => {
          const px = p.x + p.offsetX;
          const py = p.y + p.offsetY;
          const dx = px - cursor.x;
          const dy = py - cursor.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minCursorDist) {
            minCursorDist = dist;
            nearestIdx = idx;
          }
        });
      }

      // 3. Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const p1x = p1.x + p1.offsetX;
        const p1y = p1.y + p1.offsetY;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const p2x = p2.x + p2.offsetX;
          const p2y = p2.y + p2.offsetY;

          const dx = p1x - p2x;
          const dy = p1y - p2y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionLimit) {
            const opacity = (1 - dist / connectionLimit) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);

            // Distance from this line segment to the cursor to create spatial shining
            const distToCursor1 = cursor.x >= 0 ? Math.sqrt((p1x - cursor.x)**2 + (p1y - cursor.y)**2) : Infinity;
            const distToCursor2 = cursor.x >= 0 ? Math.sqrt((p2x - cursor.x)**2 + (p2y - cursor.y)**2) : Infinity;
            
            const isNearCursor = distToCursor1 < 160 || distToCursor2 < 160;

            if (isNearCursor || i === nearestIdx || j === nearestIdx) {
              const shineStrength = isNearCursor ? 2.5 : 1.8;
              ctx.strokeStyle = `rgba(0, 133, 202, ${opacity * shineStrength})`;
              ctx.lineWidth = isNearCursor ? 1.4 : 1.1;
            } else {
              ctx.strokeStyle = `rgba(255, 106, 61, ${opacity * 0.4})`;
              ctx.lineWidth = 0.5;
            }
            ctx.stroke();
          }
        }
      }

      // 4. Draw individual particles
      particles.forEach((p, idx) => {
        const px = p.x + p.offsetX;
        const py = p.y + p.offsetY;
        const distToCursor = cursor.x >= 0 ? Math.sqrt((px - cursor.x)**2 + (py - cursor.y)**2) : Infinity;
        const isNearCursor = distToCursor < 160;

        const sparkleSize = (idx % 3 === 0) ? (3.5 + Math.sin(Date.now() * 0.003 + idx) * 1.5) : 1.5;

        if (idx === nearestIdx) {
          drawDiamond(ctx, px, py, isNearCursor ? 6.5 : 5, "#FF6A3D");
          drawDiamond(ctx, px, py, isNearCursor ? 12 : 9, "#0085CA");
        } else if (isNearCursor || idx % 4 === 0) {
          drawDiamond(ctx, px, py, isNearCursor ? sparkleSize * 1.4 : sparkleSize, idx % 2 === 0 ? "#0085CA" : "#FF6A3D");
        } else {
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 106, 61, ${p.opacity * 0.8})`;
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none z-0 bg-transparent"
    />
  );
};
