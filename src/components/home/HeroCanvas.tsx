"use client";
import { useRef, useEffect } from "react";

function HeroVisual() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const CW = 2088, CH = 1462;
    canvas.width = CW;
    canvas.height = CH;

    /* === Color palette (our 6 variations) === */
    const COL = {
      indigo:  { r: 99,  g: 102, b: 241 },
      violet:  { r: 192, g: 132, b: 252 },
      teal:    { r: 45,  g: 212, b: 191 },
      cyan:    { r: 34,  g: 211, b: 238 },
      pink:    { r: 244, g: 114, b: 182 },
      rose:    { r: 236, g: 72,  b: 153 },
      amber:   { r: 200, g: 168, b: 130 },
      gold:    { r: 252, g: 211, b: 77  },
      blue:    { r: 96,  g: 165, b: 250 },
      deepblue:{ r: 59,  g: 130, b: 246 },
      magenta: { r: 232, g: 121, b: 249 },
      lavender:{ r: 167, g: 139, b: 250 },
    };

    /* === Bundle definitions ===
       Each bundle = group of lines sharing a spine wave.
       Lines spread around spine, converging/diverging for density effect. */

    const BUNDLES = [
      { col: COL.indigo, colB: COL.violet,
        lineCount: 9, spreadMax: 55,
        phaseSpeed: 0.0004, flowSpeed: 0.6,
        spineYRatio: 0.32, spineAmp: 0.13, spineFreq: 0.50,
        alpha: 0.70, lineThick: [0.6, 1.4], phase: 0 },
      { col: COL.teal, colB: COL.cyan,
        lineCount: 8, spreadMax: 50,
        phaseSpeed: 0.00035, flowSpeed: 0.5,
        spineYRatio: 0.55, spineAmp: 0.16, spineFreq: 0.60,
        alpha: 0.65, lineThick: [0.5, 1.3], phase: 1.2 },
      { col: COL.pink, colB: COL.rose,
        lineCount: 7, spreadMax: 45,
        phaseSpeed: 0.0005, flowSpeed: 0.7,
        spineYRatio: 0.72, spineAmp: 0.10, spineFreq: 0.45,
        alpha: 0.55, lineThick: [0.5, 1.1], phase: Math.PI },
      { col: COL.amber, colB: COL.gold,
        lineCount: 6, spreadMax: 40,
        phaseSpeed: 0.00055, flowSpeed: 0.8,
        spineYRatio: 0.18, spineAmp: 0.08, spineFreq: 0.70,
        alpha: 0.50, lineThick: [0.4, 1.0], phase: 2.4 },
      { col: COL.blue, colB: COL.deepblue,
        lineCount: 10, spreadMax: 65,
        phaseSpeed: 0.0003, flowSpeed: 0.45,
        spineYRatio: 0.44, spineAmp: 0.15, spineFreq: 0.55,
        alpha: 0.55, lineThick: [0.4, 1.2], phase: 3.8 },
      { col: COL.lavender, colB: COL.magenta,
        lineCount: 6, spreadMax: 35,
        phaseSpeed: 0.0006, flowSpeed: 0.9,
        spineYRatio: 0.85, spineAmp: 0.07, spineFreq: 0.75,
        alpha: 0.45, lineThick: [0.4, 0.9], phase: 5.0 },
    ];

    /* Initialize lines within each bundle */
    BUNDLES.forEach(b => {
      b.lines = [];
      for (let i = 0; i < b.lineCount; i++) {
        const t = b.lineCount === 1 ? 0 : (i / (b.lineCount - 1)) * 2 - 1;
        b.lines.push({
          t,
          phaseOffset: t * 0.8,
          thick: b.lineThick[0] + (b.lineThick[1] - b.lineThick[0]) * (1 - Math.abs(t)),
          alphaFactor: 1 - Math.abs(t) * 0.4,
          offset: Math.random() * CW * 2,
        });
      }
    });

    /* Y position for each line = spine wave + spread */
    function getLineY(bundle, line, xNorm, time) {
      const spineY = bundle.spineYRatio * CH
        + Math.sin(xNorm * bundle.spineFreq * Math.PI * 2 + time * bundle.phaseSpeed + bundle.phase) * bundle.spineAmp * CH
        + Math.sin(xNorm * bundle.spineFreq * 0.5 * Math.PI * 2 + time * bundle.phaseSpeed * 0.6) * bundle.spineAmp * CH * 0.35;
      const spreadFactor = Math.sin(xNorm * Math.PI * 1.5 + time * bundle.phaseSpeed * 1.3 + line.phaseOffset) * 0.5 + 0.5;
      return spineY + line.t * bundle.spreadMax * spreadFactor;
    }

    let time = 0;

    function draw() {
      /* Motion blur trail */
      ctx.fillStyle = "rgba(8,14,26, 0.18)";
      ctx.fillRect(0, 0, CW, CH);

      ctx.globalCompositeOperation = "screen";

      BUNDLES.forEach(bundle => {
        const { r, g, b } = bundle.col;
        const { r: r2, g: g2, b: b2 } = bundle.colB;

        /* Draw individual lines */
        bundle.lines.forEach(line => {
          line.offset += bundle.flowSpeed;
          if (line.offset > CW * 2) line.offset -= CW * 2;

          const STEPS = 150;
          ctx.beginPath();
          for (let s = 0; s <= STEPS; s++) {
            const xNorm = s / STEPS;
            const x = xNorm * CW;
            const y = getLineY(bundle, line, xNorm, time);
            if (s === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          const grad = ctx.createLinearGradient(0, 0, CW, 0);
          const a = bundle.alpha * line.alphaFactor;
          grad.addColorStop(0,    `rgba(${r},${g},${b},0)`);
          grad.addColorStop(0.12, `rgba(${r},${g},${b},${(a * 0.3).toFixed(2)})`);
          grad.addColorStop(0.5,  `rgba(${r2},${g2},${b2},${a.toFixed(2)})`);
          grad.addColorStop(0.85, `rgba(${r},${g},${b},${(a * 0.8).toFixed(2)})`);
          grad.addColorStop(1,    `rgba(${r},${g},${b},${(a * 0.12).toFixed(2)})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = line.thick;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        });

        /* Spine highlight — brightest center line */
        const SP = 180;
        ctx.beginPath();
        for (let s = 0; s <= SP; s++) {
          const xNorm = s / SP;
          const y = bundle.spineYRatio * CH
            + Math.sin(xNorm * bundle.spineFreq * Math.PI * 2 + time * bundle.phaseSpeed + bundle.phase) * bundle.spineAmp * CH
            + Math.sin(xNorm * bundle.spineFreq * 0.5 * Math.PI * 2 + time * bundle.phaseSpeed * 0.6) * bundle.spineAmp * CH * 0.35;
          if (s === 0) ctx.moveTo(xNorm * CW, y);
          else ctx.lineTo(xNorm * CW, y);
        }
        const spGrad = ctx.createLinearGradient(0, 0, CW, 0);
        spGrad.addColorStop(0,    `rgba(${r},${g},${b},0)`);
        spGrad.addColorStop(0.18, `rgba(${Math.min(r+80,255)},${Math.min(g+80,255)},${Math.min(b+60,255)},0.5)`);
        spGrad.addColorStop(0.55, `rgba(${Math.min(r+120,255)},${Math.min(g+120,255)},${Math.min(b+80,255)},0.85)`);
        spGrad.addColorStop(0.85, `rgba(${r},${g},${b},0.35)`);
        spGrad.addColorStop(1,    `rgba(${r},${g},${b},0)`);
        ctx.strokeStyle = spGrad;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      });

      ctx.globalCompositeOperation = "source-over";

      /* Left content guard overlay */
      const guard = ctx.createLinearGradient(0, 0, CW, 0);
      guard.addColorStop(0,    "rgba(8,14,26,0.97)");
      guard.addColorStop(0.22, "rgba(8,14,26,0.90)");
      guard.addColorStop(0.45, "rgba(8,14,26,0.55)");
      guard.addColorStop(0.70, "rgba(8,14,26,0.15)");
      guard.addColorStop(1,    "rgba(8,14,26,0.02)");
      ctx.fillStyle = guard;
      ctx.fillRect(0, 0, CW, CH);

      time++;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current);
      else rafRef.current = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="hero-visual-wrap">
      <canvas ref={canvasRef} className="hero-canvas" />
    </div>
  );
}

// === Hooks ===

export default HeroVisual;
