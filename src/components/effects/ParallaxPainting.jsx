import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxPainting({
  src,
  className = '',
  style = {},
  speed = 0.3,
  rotation = 0,
}) {
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    // Responsive visibility
    const mqHide = window.matchMedia('(max-width: 479px)');
    const mqReduce = window.matchMedia('(max-width: 767px)');

    const applyResponsive = () => {
      if (mqHide.matches) {
        el.style.display = 'none';
      } else {
        el.style.display = '';
        if (mqReduce.matches) {
          el.style.opacity = String(parseFloat(style.opacity ?? 1) * 0.4);
        } else {
          el.style.opacity = String(style.opacity ?? 1);
        }
      }
    };

    applyResponsive();
    mqHide.addEventListener('change', applyResponsive);
    mqReduce.addEventListener('change', applyResponsive);

    // GSAP parallax
    const yDistance = speed * 150;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -yDistance },
        {
          y: yDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
      mqHide.removeEventListener('change', applyResponsive);
      mqReduce.removeEventListener('change', applyResponsive);
    };
  }, [speed, style.opacity]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      className={className}
      draggable={false}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        filter: 'blur(1px) saturate(0.8)',
        transform: `rotate(${rotation}deg)`,
        willChange: 'transform',
        userSelect: 'none',
        ...style,
      }}
    />
  );
}
