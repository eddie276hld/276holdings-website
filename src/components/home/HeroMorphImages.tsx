"use client";
import { useEffect, useRef, useState } from "react";
import { BASE_PATH } from "@/lib/navigation";

// ============================================================
// HeroMorphImages — TRUE liquid morphing
// ------------------------------------------------------------
// Implementation: SVG <feTurbulence> + <feDisplacementMap>
// During each transition we animate the displacement `scale`
// from 0 → peak → 0 (sin curve) while cross-fading two images.
// Result: pixels physically warp/flow as one image dissolves
// into the next — i.e. real morphing, not a clip-path reveal.
// ============================================================

const IMGS = [
  `${BASE_PATH}/bg_img/motion01.webp`,
  `${BASE_PATH}/bg_img/motion02.webp`,
  `${BASE_PATH}/bg_img/motion03.webp`,
];

const HOLD_MS  = 3600; // pause on each image
const MORPH_MS = 1700; // duration of one morph
const PEAK     = 90;   // max displacement (px) — how aggressive the warp is

export default function HeroMorphImages() {
  const [cur, setCur] = useState(0);
  const [nxt, setNxt] = useState(1);
  const [morphing, setMorphing] = useState(false);

  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let raf = 0;
    const timer = window.setTimeout(() => {
      setMorphing(true);
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / MORPH_MS);
        // Sine wave: 0 → 1 → 0  → displacement peaks mid-transition
        const wave = Math.sin(t * Math.PI);
        if (dispRef.current) {
          dispRef.current.setAttribute("scale", String(wave * PEAK));
        }
        if (turbRef.current) {
          // Subtly shift turbulence frequency for liquid feel
          turbRef.current.setAttribute(
            "baseFrequency",
            String(0.008 + wave * 0.022)
          );
        }
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          // Commit swap → next becomes current, advance next
          setCur(nxt);
          setNxt((nxt + 1) % IMGS.length);
          setMorphing(false);
        }
      };

      raf = requestAnimationFrame(step);
    }, HOLD_MS);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [cur, nxt]);

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "65%",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, display: "block" }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Liquid morph filter — turbulence drives displacement */}
          <filter
            id="hmLiquid"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.008"
              numOctaves="2"
              seed="9"
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Soft left-edge fade — eliminates the hard transparency boundary
              of the source webps when blending into the dark hero bg */}
          <linearGradient id="hmFade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.22" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="hmMask">
            <rect width="100%" height="100%" fill="url(#hmFade)" />
          </mask>
        </defs>

        <g mask="url(#hmMask)" filter="url(#hmLiquid)">
          <image
            href={IMGS[cur]}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{
              opacity: morphing ? 0 : 1,
              transition: `opacity ${MORPH_MS}ms ease-in-out`,
            }}
          />
          <image
            href={IMGS[nxt]}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{
              opacity: morphing ? 1 : 0,
              transition: `opacity ${MORPH_MS}ms ease-in-out`,
            }}
          />
        </g>
      </svg>
    </div>
  );
}
