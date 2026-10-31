import {useEffect} from 'react';
import {useLocation} from '@/lib/rr-shim';

/** Progressive enhancement: content is visible before JS, native scroll on touch. */
export default function PremiumMotion() {
  const {pathname} = useLocation();
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(pointer: fine)');
    let dispose = () => {};
    let generation = 0;
    function setup() {
      dispose();
      const current = ++generation;
      if (reduce.matches) return;
      const animations: Animation[] = [];
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          if (entry.boundingClientRect.top > 60) animations.push(entry.target.animate([
            {opacity: .35, transform: 'translateY(24px)'}, {opacity: 1, transform: 'translateY(0)'}
          ], {duration: 850, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'none'}));
          observer.unobserve(entry.target);
        }
      }, {threshold: .12});
      document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
      let lenis: {destroy:()=>void} | undefined;
      if (pointer.matches) import('@/lib/vendor/lenis.mjs').then(({default: Lenis}) => {
        if (current !== generation) return;
        lenis = new Lenis({autoRaf: true, duration: .85, smoothWheel: true, syncTouch: false, anchors: false,
          prevent: (node: HTMLElement) => !!node.closest('[role="dialog"], [data-lenis-prevent], textarea, select')});
      }).catch(() => { /* Native scrolling remains available. */ });
      dispose = () => { observer.disconnect(); animations.forEach(a => a.cancel()); lenis?.destroy(); };
    }
    setup();
    reduce.addEventListener('change', setup);
    pointer.addEventListener('change', setup);
    return () => { generation++; dispose(); reduce.removeEventListener('change', setup); pointer.removeEventListener('change', setup); };
  }, [pathname]);
  return null;
}
