"use client";
import { useRef, useEffect } from "react";

function FlowPayVisual() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); const W = 1600, H = 900; c.width = W; c.height = H;
    let t = 0, raf;
    const blocks = Array.from({length:24}, (_,i) => ({
      x: 100 + Math.random()*1200, y: 80 + Math.random()*740, w: 30+Math.random()*60, h: 20+Math.random()*40,
      speed: .3+Math.random()*.6, phase: Math.random()*Math.PI*2, dy: (Math.random()-.5)*30,
      color: [[99,102,241],[192,132,252],[45,212,191],[34,211,238],[200,168,130]][i%5]
    }));
    const draw = () => {
      ctx.clearRect(0,0,W,H); t += .008;
      // Flow lines
      for (let i=0;i<8;i++) {
        const y = 100 + i*120 + Math.sin(t*1.5+i)*20;
        ctx.beginPath(); ctx.moveTo(0,y);
        for (let x=0;x<=W;x+=4) { ctx.lineTo(x, y + Math.sin(x*.008+t*2+i)*25 + Math.cos(x*.005+t*1.3)*15); }
        ctx.strokeStyle = `rgba(${[99,102,241,45,212,191,192,132,252,34,211,238,200,168,130,244,114,182][i*3]},${[99,102,241,45,212,191,192,132,252,34,211,238,200,168,130,244,114,182][i*3+1]},${[99,102,241,45,212,191,192,132,252,34,211,238,200,168,130,244,114,182][i*3+2]},.12)`;
        ctx.lineWidth = 1.5; ctx.stroke();
      }
      // Blocks with direction
      ctx.globalCompositeOperation = "screen";
      blocks.forEach(b => {
        const px = ((b.x + t*b.speed*200)%W+W)%W;
        const py = b.y + Math.sin(t*2+b.phase)*b.dy;
        const a = .15 + Math.sin(t*1.5+b.phase)*.1;
        ctx.fillStyle = `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${a})`;
        ctx.beginPath();
        const r = 6;
        ctx.moveTo(px+r,py); ctx.lineTo(px+b.w-r,py); ctx.quadraticCurveTo(px+b.w,py,px+b.w,py+r);
        ctx.lineTo(px+b.w,py+b.h-r); ctx.quadraticCurveTo(px+b.w,py+b.h,px+b.w-r,py+b.h);
        ctx.lineTo(px+r,py+b.h); ctx.quadraticCurveTo(px,py+b.h,px,py+b.h-r);
        ctx.lineTo(px,py+r); ctx.quadraticCurveTo(px,py,px+r,py);
        ctx.fill();
        // Motion trail
        ctx.fillStyle = `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${a*.3})`;
        ctx.fillRect(px-b.w*.6, py+b.h*.2, b.w*.6, b.h*.6);
      });
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{width:"100%",height:"100%",display:"block",opacity:.7}}/>;
}

export default FlowPayVisual;
