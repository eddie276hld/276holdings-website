"use client";
import { useRef, useEffect } from "react";

function FlowScoreVisual() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); const W = 1600, H = 900; c.width = W; c.height = H;
    let t = 0, raf;
    const nodes = Array.from({length:36}, (_,i) => ({
      x: 80+Math.random()*1440, y: 60+Math.random()*780,
      r: 2+Math.random()*3, phase: Math.random()*Math.PI*2,
      color: [[96,165,250],[129,140,248],[167,139,250],[232,121,249],[200,168,130]][i%5]
    }));
    const draw = () => {
      ctx.clearRect(0,0,W,H); t += .006;
      // Grid lines (subtle pulse)
      ctx.globalAlpha = .06 + Math.sin(t*2)*.02;
      for (let x=0;x<W;x+=60) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.strokeStyle = "#60a5fa"; ctx.lineWidth = .5; ctx.stroke(); }
      for (let y=0;y<H;y+=60) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
      ctx.globalAlpha = 1;
      // Intersecting diagonal lines
      ctx.globalCompositeOperation = "screen";
      for (let i=0;i<8;i++) {
        const angle = (i/8)*Math.PI + t*.3;
        const cx = W/2 + Math.cos(t*.5+i)*100, cy = H/2 + Math.sin(t*.4+i)*80;
        ctx.beginPath();
        ctx.moveTo(cx-Math.cos(angle)*400, cy-Math.sin(angle)*400);
        ctx.lineTo(cx+Math.cos(angle)*400, cy+Math.sin(angle)*400);
        ctx.strokeStyle = `rgba(${[96,165,250,129,140,248,167,139,250,232,121,249][i*3%12]||129},${[96,165,250,129,140,248,167,139,250,232,121,249][(i*3+1)%12]||140},${[96,165,250,129,140,248,167,139,250,232,121,249][(i*3+2)%12]||248},.08)`;
        ctx.lineWidth = 1; ctx.stroke();
      }
      // Nodes with glow
      nodes.forEach(n => {
        const pulse = 1 + Math.sin(t*3+n.phase)*.4;
        const glow = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*4*pulse);
        glow.addColorStop(0, `rgba(${n.color[0]},${n.color[1]},${n.color[2]},.3)`);
        glow.addColorStop(1, `rgba(${n.color[0]},${n.color[1]},${n.color[2]},0)`);
        ctx.fillStyle = glow; ctx.fillRect(n.x-n.r*4,n.y-n.r*4,n.r*8,n.r*8);
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*pulse,0,Math.PI*2);
        ctx.fillStyle = `rgba(${n.color[0]},${n.color[1]},${n.color[2]},.5)`; ctx.fill();
      });
      // Connections between close nodes
      nodes.forEach((a,ai) => {
        nodes.forEach((b,bi) => {
          if (bi<=ai) return;
          const d = Math.hypot(a.x-b.x,a.y-b.y);
          if (d < 250) {
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.strokeStyle = `rgba(167,139,250,${(.15-d/1500)*(1+Math.sin(t*2)*.3)})`;
            ctx.lineWidth = .5; ctx.stroke();
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

export default FlowScoreVisual;
