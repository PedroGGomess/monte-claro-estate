import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ dot: { x: 0, y: 0 }, ring: { x: 0, y: 0 } });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const loop = () => {
      pos.current.dot.x += (mouse.current.x - pos.current.dot.x) * 0.25;
      pos.current.dot.y += (mouse.current.y - pos.current.dot.y) * 0.25;
      pos.current.ring.x += (mouse.current.x - pos.current.ring.x) * 0.12;
      pos.current.ring.y += (mouse.current.y - pos.current.ring.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.dot.x - 4}px, ${pos.current.dot.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.ring.x - 18}px, ${pos.current.ring.y - 18}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-gold pointer-events-none z-[10000]"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border border-gold/40 pointer-events-none z-[10000]"
        style={{ willChange: "transform" }}
      />
    </>
  );
};

export default CustomCursor;
