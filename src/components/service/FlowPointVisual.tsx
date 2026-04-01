"use client";
import { useRef, useEffect } from "react";

function FlowPointVisual() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); const W = 1600, H = 900; c.width = W; c.height = H;
    let t = 0, raf;
    const pts = Array.from({length:28}, (_,i) => ({
      x: 100+Math.random()*1400, y: 80+Math.random()*740,
      vx: (Math.random()-.5)*.5, vy: (Math.random()-.5)*.5,
      r: 3+Math.random()*3, phase: Math.random()*Math.PI*2,
      color: [[34,211,238],[45,212,191],[244,114,182],[200,168,130],[167,139,250]][i%5]
    }));
    const draw = () => {
      ctx.clearRect(0,0,W,H); t += .007;
      ctx.globalCompositeOperation = "screen";
      // Translucent floating planes
      for (let i=0;i<5;i++) {
        const cx = W/2 + Math.sin(t*.6+i*1.3)*180;
        const cy = H/2 + Math.cos(t*.5+i*1.1)*120;
        const rot = t*.2 + i*Math.PI/5;
        ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot);
        const colors = [[34,211,238],[45,212,191],[244,114,182],[200,168,130],[167,139,250]];
        const cl = colors[i];
        ctx.fillStyle = `rgba(${cl[0]},${cl[1]},${cl[2]},.04)`;
        ctx.fillRect(-180,-100,360,200);
        ctx.strokeStyle = `rgba(${cl[0]},${cl[1]},${cl[2]},.08)`;
        ctx.lineWidth = 1; ctx.strokeRect(-180,-100,360,200);
        ctx.restore();
      }
      // Nodes
      pts.forEach(p => {
        p.x += p.vx + Math.sin(t+p.phase)*.3;
        p.y += p.vy + Math.cos(t*1.2+p.phase)*.3;
        if (p.x<80||p.x>W-80) p.vx *= -1;
        if (p.y<80||p.y>H-80) p.vy *= -1;
        const pulse = 1 + Math.sin(t*2.5+p.phase)*.3;
        const glow = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5*pulse);
        glow.addColorStop(0, `rgba(${p.color[0]},${p.color[1]},${p.color[2]},.25)`);
        glow.addColorStop(1, `rgba(${p.color[0]},${p.color[1]},${p.color[2]},0)`);
        ctx.fillStyle = glow; ctx.fillRect(p.x-p.r*5,p.y-p.r*5,p.r*10,p.r*10);
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r*pulse,0,Math.PI*2);
        ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},.45)`; ctx.fill();
      });
      // Dynamic connections
      pts.forEach((a,ai) => {
        pts.forEach((b,bi) => {
          if (bi<=ai) return;
          const d = Math.hypot(a.x-b.x,a.y-b.y);
          if (d < 280) {
            const progress = (Math.sin(t*1.5+ai+bi)+1)/2;
            ctx.beginPath();
            const mx = (a.x+b.x)/2 + Math.sin(t+ai)* 20, my = (a.y+b.y)/2 + Math.cos(t+bi)*20;
            ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(mx,my,b.x,b.y);
            ctx.strokeStyle = `rgba(34,211,238,${(.12-d/2000)*progress})`;
            ctx.lineWidth = .8; ctx.stroke();
          }
        });
      });
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{width:"100%",height:"100%",display:"block",opacity:.7}}/>;
}

// === FLOWPAY PAGE ===

export default FlowPointVisual;
