import { useEffect, useRef } from "react";

/**
 * Magnetic hover effect. Returns a ref to attach to the element that should
 * drift toward the cursor when within a certain radius.
 */
export function useMagnetic(strength = 0.35, pullRadius = 80, maxMove = 12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Calculate straight-line distance to cursor
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < pullRadius) {
        // Calculate raw movement
        let moveX = distanceX * strength;
        let moveY = distanceY * strength;
        
        // Clamp movement to maxMove
        const moveDist = Math.sqrt(moveX * moveX + moveY * moveY);
        if (moveDist > maxMove) {
          moveX = (moveX / moveDist) * maxMove;
          moveY = (moveY / moveDist) * maxMove;
        }
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        el.style.transform = "translate(0px, 0px)";
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [strength, pullRadius, maxMove]);

  return ref;
}
